import React, { useEffect, useState } from 'react';
import { MichelsonMap } from '@taquito/taquito';
import BetTicket from './BetTicket'
import { defaultHorses } from 'hourse'

function BetTicketCard({ storage, userAddress }) {
  const [betTickes, setBetTickets] = useState([]);

  useEffect(() => {
    console.log("BetTicketCard", storage)
    if (storage && userAddress) {
      console.log("userAddress", userAddress)

      storage.bets?.get(userAddress)
        .then((userBets: MichelsonMap<string, any>) => {
          console.log("userBets", userBets)
          return userBets.get('1');
        })
        .then(raceBets => {
          console.log("raceBets", raceBets)
          return raceBets.map((ticket: any) => ({
            horseId: ticket.horseId.toNumber(),
            horseName: getHorseName(ticket.horseId.toNumber()),
            betAmount: convertTezos(ticket.amount.toNumber()),
            payout: ticket.payout.toNumber(),
          }))
        })
        .then(tickets => {
          console.log("tickets", tickets)
          setBetTickets(tickets)
        })
    }
  }, [storage, userAddress])

  const getHorseName = (horseId) => {
    const horse = defaultHorses.find(it => it.id === horseId);
    return horse?.name;
  }

  const convertTezos = (mutez) => {
    return mutez / 1000000;
  }

  return (
    <div className="flex gap-4">
      { betTickes.map((ticket: any) => (
        <BetTicket {...ticket}></BetTicket>
      ))}
    </div>
  );
}

export default BetTicketCard;
