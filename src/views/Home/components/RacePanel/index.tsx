import React, { useEffect, useMemo, useState } from 'react';
import { useMethod, useRandomNumber } from 'hooks/useContract';
import useBeacon from 'hooks/useBeacon';
import useToast from 'hooks/useToast';

const RacePanel = ({ unityContext }) => {
  const [ raceState, setRaceState] = useState(0);
  const { connected } = useBeacon();
  const { takeReward } = useMethod();
  const { toastError, toastSuccess } = useToast();
  const randomNumber = useRandomNumber();

  useEffect(() => {
    if (randomNumber) {
      unityContext.on("FinishRace", function (horse: string, time: string) {
        console.log("FinishRace", horse, time)
        setRaceState(2);
      });
    }
  }, [unityContext, randomNumber]);

  const startButtonStyle = useMemo(() => {
    if (!randomNumber || raceState === 1) {
      return "text-white bg-gray-400 dark:bg-gray-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center w-36"
    } else {
      return "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-36"
    }
  }, [randomNumber, raceState]);

  const rewardButtonStyle = useMemo(() => {
    if (raceState !== 2) {
      return "text-white bg-gray-400 dark:bg-gray-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center w-36"
    } else {
      return "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-36"
    }
  }, [raceState]);

  const handleStartRace = () => {
    console.log("startRace")
    if (!connected) {
      toastError("Error", "Please Connect Your Wallet");
      return;
    }
    
    setRaceState(1);
    unityContext.send("GameController", "StartRaceNow", 45);
  }

  const handleTakeReward = async () => {
    if (raceState !== 2) {
      return;
    }

    await takeReward();
    toastSuccess("Success", "You got reward successfully");
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