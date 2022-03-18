import React, { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import useTezrun from 'hooks/useTezrun';
import {useRandomNumber} from 'hooks/useOracle';
import useBeacon from 'hooks/useBeacon';
import useAdmin from 'hooks/useAdmin';
import useToast from 'hooks/useToast';
import {RaceState} from 'config';
import {defaultHorses} from 'hourse';


const RacePanel = ({ unityContext, raceState, setRaceState }) => {  
  const {connected} = useBeacon();
  const {startRace, finishRace} = useAdmin();
  const {takeReward} = useTezrun();
  const {toastError, toastSuccess} = useToast();
  const randomNumber = useRandomNumber();
  const [resultHorses, setResultHorses] = useState<any[]>([]);
  const [finished, setFinished] = useState(false);
  const [winner, setWinner] = useState<undefined | number>(undefined);
 
  const handleFinishRace = async (name: string, time: string) => {
    setRaceState(RaceState.Finished);
    
    const index = resultHorses.findIndex(h => h.name === name);
    if (index < 0) {
      resultHorses.push({ name, time })
      setResultHorses([...resultHorses]);
    }

    if (resultHorses.length === 6) {
      resultHorses.sort((a: any, b: any) => {
        return moment(a.time).diff(b.time);
      })

      const firstHorse = resultHorses[0];
      const horse = defaultHorses.find(it => it.name === firstHorse.name);
      if (horse) {
        setWinner(horse.id);
      }
    }
  };

  useEffect(() => {
    if (randomNumber) {
      console.log("Initialize Unity Events")
      unityContext.on("FinishedRace", function (horse: string, time: string) {
        handleFinishRace(horse, time);
      });
    }
  });
  

  const startButtonStyle = useMemo(() => {
    if (!randomNumber || raceState === RaceState.Started) {
      return "text-white bg-gray-400 dark:bg-gray-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center w-36"
    } else {
      return "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-36"
    }
  }, [randomNumber, raceState]);

  const rewardButtonStyle = useMemo(() => {
    if (raceState !== RaceState.Finished) {
      return "text-white bg-gray-400 dark:bg-gray-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center w-36"
    } else {
      return "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-36"
    }
  }, [raceState]);


  const handleStartRace = async () => {
    console.log("startRace")
    if (!connected) {
      toastError("Error", "Please Connect Your Wallet");
      return;
    }

    console.log("call start race contract");
    await startRace();
    
    console.log("call start race to unity");
    unityContext.send("GameController", "StartRaceNow", 45);

    setFinished(false);
    setWinner(undefined);
    setResultHorses([]);
    setRaceState(RaceState.Started);
  }

  const handleTakeReward = async () => {
    if (raceState !== RaceState.Finished) {
      return;
    }

    //console.log("~~~~~~~~~~~~~winner", winner)
    if (winner) {
      if (!finished) {
        setFinished(true);
        await finishRace(winner);
      }

      await takeReward();
      toastSuccess("Success", "You got reward successfully");
    }
  }

  return (
    <div className="text-center mt-6">
      <button
        type="button"
        className={startButtonStyle}
        onClick={handleStartRace}
        disabled={!randomNumber}
      >
        Start Race
      </button>
      <button
        type="button"
        className={rewardButtonStyle + " mt-4"}
        onClick={handleTakeReward}
        disabled={!randomNumber}
      >
        Take Reward
      </button>
    </div>
  );
}

export default RacePanel;