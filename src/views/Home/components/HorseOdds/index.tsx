import React, { useState } from 'react';
import { defaultHorses } from 'hourse';

function HorseOdds() {
  const [horses, setHorses] = useState(defaultHorses);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl">
      <div className="px-2">
        <h3 className="text-slate-900 dark:text-white mb-5 text-base font-medium tracking-tight">Odds</h3>
        { horses.map((horse, index) => (
          <p key={index} className="text-slate-500 dark:text-slate-400 mt-2">
            { horse.name } - 1: {horse.payout}
          </p>
        ))}
      </div>
    </div>
  );
}

export default HorseOdds;
