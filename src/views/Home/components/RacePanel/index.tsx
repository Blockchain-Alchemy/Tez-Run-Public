import React, { useEffect, useState } from "react";
import moment from "moment";
import useTezrun from "hooks/useTezrun";
import useToast from "hooks/useToast";
import useBeacon from "hooks/useBeacon";
import useAdmin from "hooks/useAdmin";
import { defaultHorses } from "hourse";
import { finishRace, getRewards } from "services";

const isAdmin = false;

const RacePanel = ({ unityContext }) => {
  const { address } = useBeacon();
  const { takeReward } = useTezrun();
  const { toastSuccess } = useToast();
  const { readyRace } = useAdmin();
  const [resultHorses, setResultHorses] = useState<any[]>([]);
  const [winner, setWinner] = useState<undefined | number>(undefined);

  const onFinishRace = async (name: string, time: string) => {
    const index = resultHorses.findIndex((h) => h.name === name);
    if (index < 0) {
      resultHorses.push({ name, time });
      setResultHorses([...resultHorses]);
    }

    if (resultHorses.length === 6) {
      resultHorses.sort((a: any, b: any) => {
        return moment(a.time).diff(b.time);
      });

      const firstHorse = resultHorses[0];
      const horse = defaultHorses.find((it) => it.name === firstHorse.name);
      if (horse) {
        setWinner(horse.id);
        await finishRace();
      }
    }
  };

  useEffect(() => {
    console.log("Initialize Unity Events");
    unityContext.on("FinishedRace", function (horse: string, time: string) {
      onFinishRace(horse, time);
    });
  }, [unityContext]);

  const handleTakeReward = async () => {
    console.log("TakeReward", address);
    try {
      if (address) {
        const result = await getRewards(address);
        console.log("rewards", result);
        if (result && result.mutez) {
          const rewards = Number(result.mutez);
          if (rewards > 0) {
            await takeReward();
            toastSuccess("Success", "You got reward successfully");
          }
        } else {
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleReadyRace = async () => {
    try {
      const op = await readyRace();
      console.log("ReadyRace Result", op);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="text-center mt-6">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-36 mb-4"
          onClick={handleTakeReward}
          disabled={false}
        >
          Take Reward
        </button>
      </div>
      {isAdmin && (
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-36 mb-4"
          onClick={handleReadyRace}
          disabled={false}
        >
          Ready Race
        </button>
      )}
    </>
  );
};

export default RacePanel;
