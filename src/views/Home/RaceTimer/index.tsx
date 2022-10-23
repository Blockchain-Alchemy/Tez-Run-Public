import React, { useEffect, useState } from "react";
import moment from "moment";
import { Race, RaceState } from "types";

type RaceTimerProps = {
  race: Race;
}

const RaceTimer = ({ race } : RaceTimerProps) => {
  const [remainTime, setRemainTime] = useState(0);

  useEffect(() => {
    if (race && race.status === RaceState.Ready) {
      const seconds = moment(race.start_time).diff(moment(), 'seconds');
      console.log('seconds', seconds)
      setRemainTime(seconds);
    }
  }, [race]);

  // Start timer
  setTimeout(() => {
    if (remainTime > 0) {
      setRemainTime(remainTime - 1);
    }
  }, 1000)

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl">
      <div className="px-6 text-center">
        <h3 className="text-slate-900 dark:text-white mb-5 text-base font-medium tracking-tight">
          Race Starts in:
        </h3>
        <p
          id="race-start-time"
          className="text-slate-500 dark:text-slate-400 mt-2"
        >
          {moment.utc(remainTime * 1000).format("HH:mm:ss")}
        </p>
      </div>
    </div>
  );
}

export default RaceTimer;
