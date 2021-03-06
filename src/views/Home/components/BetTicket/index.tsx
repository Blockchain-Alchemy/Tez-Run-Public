import React, {useState, useCallback} from 'react';
import BetTicket from './BetTicket'
import {defaultHorses} from 'hourse'
import {useInterval} from "hooks/useInterval"
import useTezrun from 'hooks/useTezrun';

function BetTicketCard({ userAddress }) {
  const [betTickes, setBetTickets] = useState([]);
  const [winner, setWinner] = useState(undefined);
  const {getStorage, getWinner} = useTezrun();

  const updateTickets = useCallback(() => {
    if (!userAddress) {
      return
    }
    return getWinner()
      ?.then(winner => {
        winner && setWinner(winner);
        return getStorage();
      })
      .then((storage: any) => {
        return storage?.bets?.get(userAddress);
      })
      .then(raceBets => {
        //console.log("raceBets", raceBets)
        return raceBets
          ?.filter((ticket: any) => !ticket.rewarded)
          .map((ticket: any) => ({
            horseId: ticket.horseId.toNumber(),
            horseName: getHorseName(ticket.horseId.toNumber()),
            betAmount: convertTezos(ticket.amount.toNumber()),
            payout: ticket.payout.toNumber(),
            token: ticket.token.toNumber(),
          }))
      })
      .then(tickets => {
        console.log("tickets", tickets)
        tickets && setBetTickets(tickets)
        return getWinner();
      })
      .then(winner => {
        console.log("winner:", winner)
        setWinner(winner);
      })
  }, [userAddress, getStorage, setBetTickets, getWinner, setWinner])

  useInterval(() => {
    updateTickets()
  }, 5000)

  const getHorseName = (horseId) => {
    const horse = defaultHorses.find(it => it.id === horseId);
    return horse?.name;
  }

  const convertTezos = (mutez) => {
    return mutez / 1000000;
  }

  return (
    <div className="flex gap-4">
      { betTickes.map((ticket: any, index: number) => (
        <BetTicket key={index} winner={winner} ticket={ticket}></BetTicket>
      ))}
    </div>
  );
}

export default BetTicketCard;