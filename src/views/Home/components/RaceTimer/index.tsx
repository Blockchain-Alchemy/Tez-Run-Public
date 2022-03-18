import React, { useEffect, useState } from 'react';
import moment from 'moment';
import useTezrun from 'hooks/useTezrun';

function RaceTimer() {
  const [remainTime, setRemainTime] = useState(0);
  const {getStorage} = useTezrun();

  useEffect(() => {
    getStorage()?.then((storage: any) => {
      const { startTime } = storage;
      if (startTime) {
        console.log("startTime", moment(startTime).format("YYYY-MM-DD HH:mm:ss"))
        const time = moment(startTime).diff(moment(), 'seconds');
        setRemainTime(time > 0 ? time : 0);
      }
    })
  }, [getStorage])

  // Start timer
  setTimeout(() => {
    if (remainTime > 0) {
      setRemainTime(remainTime - 1);
    }
  }, 1000)

  const getRemainTime = () => {
    if (remainTime) {
      return moment.utc(remainTime * 1000).format('HH:mm:ss');
    }
    return 0
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl">
      <div className="px-6 text-center">
        <h3 className="text-slate-900 dark:text-white mb-5 text-base font-medium tracking-tight">Race Starts in:</h3>
        <p id="race-start-time"className="text-slate-500 dark:text-slate-400 mt-2">{ getRemainTime() }</p>
      </div>
    </div>
  );
}

export default RaceTimer;
