import React, { useState } from 'react';

function BetTicket() {

  return (
    <div className="col-start-4 col-span-2">
      <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl">
        <h3 className="text-slate-900 dark:text-white mb-5 text-base font-medium tracking-tight">Bet Ticket</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Horse 1</p>
        <p className="text-slate-500 dark:text-slate-400 mt-2">To Win</p>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Bet Placed:</p>
        <p className="text-slate-500 dark:text-slate-400 mt-2">100 uUSD:</p>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Will Win:</p>
        <p className="text-slate-500 dark:text-slate-400 mt-2">200 uUSD</p>
      </div>
    </div>
  );
}

export default BetTicket;
