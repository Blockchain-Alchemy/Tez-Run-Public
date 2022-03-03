import React, { useEffect, useState } from 'react';
import { MichelsonMap } from '@taquito/taquito';
import BetTicket from './BetTicket'

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
          setBetTickets(raceBets);
        })
    }
  }, [storage, userAddress])

  return (
    <div className="flex gap-4">
      { betTickes.map((ticket: any) => (
        <BetTicket
          horseId={ticket.horseId.toNumber()}
          payout={ticket.payout.toNumber()}
          betAmount={ticket.amount.toNumber()}
        ></BetTicket>
      ))}
    </div>
  );
}

export default BetTicketCard;
