import React, { useState } from 'react';

function RaceTimer() {

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl">
      <div className="px-6 text-center">
        <h3 className="text-slate-900 dark:text-white mb-5 text-base font-medium tracking-tight">Race Starts in:</h3>
        <p id="race-start-time"className="text-slate-500 dark:text-slate-400 mt-2"></p>
      </div>
    </div>
  );
}

export default RaceTimer;
