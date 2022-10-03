import React, { useEffect, useState } from "react";
import moment from "moment";
import useTezrun from "hooks/useTezrun";
import useToast from "hooks/useToast";
import { defaultHorses } from "hourse";
import { finishRace } from "services";

const RacePanel = ({ unityContext }) => {
  const { takeReward } = useTezrun();
  const { toastSuccess } = useToast();
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
    console.log("TakeReward", winner);
    if (winner) {
      await takeReward();
      toastSuccess("Success", "You got reward successfully");
    }
  };

  return (
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
  );
};

export default RacePanel;
