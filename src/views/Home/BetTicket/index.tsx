import React, { useMemo } from "react";
import { defaultHorses } from "hourse";

const convertTezos = (mutez) => {
  return mutez / 1000000;
};

const convertToken = (token) => {
  return token / 1000000000000;
};

const BetTicket = ({ ticket }) => {
  const horseName = useMemo(() => {
    const horse = defaultHorses.find((it) => it.id === ticket.horseId);
    return horse?.name;
  }, [ticket]);

  const balance = useMemo(() => {
    if (ticket.token === 0) {
      return convertTezos(ticket.tezos);
    } else {
      return convertToken(ticket.amount);
    }
  }, [ticket])

  const unitName = useMemo(() => {
    return ticket.token === 0 ? "ꜩ" : "uUSD";
  }, [ticket]);


  return (
    <div className="bg-white w-50 dark:bg-slate-900 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl">
      <h3 className="text-slate-900 dark:text-white mb-5 text-base font-medium tracking-tight">
        Bet Ticket
      </h3>
      <p className="text-slate-500 dark:text-slate-400 mt-2">{horseName}</p>
      <p className="text-slate-500 dark:text-slate-400 mt-2">To Win</p>
      <p className="text-slate-500 dark:text-slate-400 mt-2">
        <span>Bet Placed: </span>
        <span className="text-slate-900 dark:text-white mb-5 text-base font-medium">
          {balance}
        </span>{" "}
        {unitName}
      </p>
      <p className="text-slate-500 dark:text-slate-400 mt-2">
        <span>Will Win: </span>
        <span className="text-slate-900 dark:text-white mb-5 text-base font-medium">
          {(balance * ticket.payout).toFixed(5)}
        </span>{" "}
        {unitName}
      </p>
      <p className="text-slate-500 dark:text-slate-400 mt-2">
        {/* <span>{ !winner? "" : (winner === ticket?.horseId) ? "Winner" : "Loose" }</span> */}
      </p>
    </div>
  );
};

export default BetTicket;
