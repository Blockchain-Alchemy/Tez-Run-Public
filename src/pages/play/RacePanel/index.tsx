import React, { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-hot-toast";
import useTezrun from "hooks/useTezrun";
import useBeacon from "hooks/useBeacon";
import Loader from "components/loader";
import { defaultHorses } from "../horses";
import { readyRace, startRace, finishRace, getRewards } from "services";

const isAdmin = true;

const RacePanel = ({ unityContext }) => {
  const { indexer, address } = useBeacon();
  const { takeReward } = useTezrun();
  const [loading, setLoading] = useState(false);
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
        console.log("FinishRace", horse);
        setWinner(horse.id);
        //await finishRace();
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
      setLoading(true);
      if (address) {
        const result = await getRewards(indexer, address);
        console.log("rewards", result);
        if (result?.tezos || result?.tokens) {
          await takeReward();
          toast.success("You got reward successfully");
        } else {
          toast.success("There is not rewards");
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleReadyRace = async () => {
    try {
      setLoading(true);
      const op = await readyRace();
      console.log("ReadyRace Result", op);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleStartRace = async () => {
    try {
      setLoading(true);
      const op = await startRace();
      console.log("StartRace Result", op);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleFinishRace = async () => {
    try {
      setLoading(true);
      const op = await finishRace();
      console.log("FinishRace Result", op);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
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
        {isAdmin && address && (
          <>
            {loading && <Loader />}
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-36 mb-4"
              onClick={handleReadyRace}
              disabled={false}
            >
              Ready Race
            </button>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-36 mb-4"
              onClick={handleStartRace}
              disabled={false}
            >
              Start Race
            </button>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-36 mb-4"
              onClick={handleFinishRace}
              disabled={false}
            >
              Finish Race
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default RacePanel;
