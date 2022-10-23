import React, { useState, useCallback } from "react";
import BetTicket from "./BetTicket";
import { defaultHorses } from "hourse";
import { useInterval } from "hooks/useInterval";
import { getTickets } from "services";
import useTezrun from "hooks/useTezrun";

const getHorseName = (horseId) => {
  const horse = defaultHorses.find((it) => it.id === horseId);
  return horse?.name;
};

const convertTezos = (mutez) => {
  return mutez / 1000000;
};

const convertToken = (token) => {
  return token / 1000000000000;
};

function BetTicketCard({ userAddress }) {
  const [betTickes, setBetTickets] = useState([]);
  const [winner, setWinner] = useState(undefined);

  /*const updateTickets = useCallback(() => {
    if (!userAddress) {
      return
    }
    return getStorage()
      ?.then((storage: any) => {
        return storage?.race.bets;
      })
      .then(raceBets => {
        return raceBets
          ?.filter((ticket: any) => ticket.address === userAddress)
          .map((ticket: any) => ({
            horseId: ticket.horse_id.toNumber(),
            horseName: getHorseName(ticket.horse_id.toNumber()),
            betAmount: convertTezos(ticket.amount.toNumber()),
            payout: ticket.payout.toNumber(),
            token: 0,//ticket.token.toNumber(),
          }))
      })
      .then(tickets => {
        tickets && setBetTickets(tickets)
        return getWinner();
      })
      .then(winner => {
        setWinner(winner);
      })
  }, [userAddress, getStorage, setBetTickets, getWinner, setWinner])*/

  const updateTickets = useCallback(() => {
    getTickets(userAddress)
      .then((tickets) => {
        console.log("tickets", tickets);
        return tickets.map((ticket: any) => {
          const horseId = Number(ticket.horse_id);
          const token = Number(ticket.token);
          console.log('token', token)
          const betAmount = token
            ? convertToken(Number(ticket.amount))
            : convertTezos(Number(ticket.tezos));
          return {
            horseId: horseId,
            horseName: getHorseName(horseId),
            betAmount,
            payout: Number(ticket.payout),
            token,
          };
        });
      })
      .then((tickets) => {
        tickets && setBetTickets(tickets);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userAddress]);

  useInterval(() => {
    updateTickets();
  }, 5000);

  return (
    <div className="flex gap-4">
      {betTickes.map((ticket: any, index: number) => (
        <BetTicket key={index} winner={winner} ticket={ticket}></BetTicket>
      ))}
    </div>
  );
}

export default BetTicketCard;
