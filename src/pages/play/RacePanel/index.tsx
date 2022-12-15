import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import moment from "moment";
import { Box, Button, Card, Typography } from "@mui/material";

import useTezrun from "hooks/useTezrun";
import useBeacon from "hooks/useBeacon";
import { defaultHorses } from "../horses";
import { finishRace, getRewards } from "services";
import { setLoading } from "slices/play";
import { RaceState } from "../types";

const RacePanel = ({ race, unityContext }) => {
  const dispatch = useDispatch();
  const { indexer, address } = useBeacon();
  const { takeReward } = useTezrun();
  const [resultHorses, setResultHorses] = useState<any[]>([]);
  const { addEventListener, removeEventListener } = unityContext;

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
      console.log("Winner:", firstHorse);
      const horse = defaultHorses.find((it) => it.name === firstHorse.name);
      if (horse) {
        console.log("FinishRace", horse);
        await finishRace(horse.id);
      }
    }
  };

  useEffect(() => {
    console.log("Initialize Unity Events");
    addEventListener("FinishedRace", onFinishRace);

    return () => {
      removeEventListener("FinishedRace", onFinishRace);
    };
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

  /*const handleReadyRace = async () => {
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
  };*/

  const handleFinishRace = async () => {
    try {
      dispatch(setLoading(true));
      await finishRace();
      toast.success("The race is finished!");
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Card sx={{ mt: 2, px: 1, py: 2 }}>
      <Box sx={{ textAlign: "center", mb: 1 }}>
        <Button
          variant="contained"
          fullWidth
          size="medium"
          onClick={handleFinishRace}
          disabled={!race || race.status !== RaceState.Started}
        >
          Debug: End Race
        </Button>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          fullWidth
          size="medium"
          onClick={handleTakeReward}
          disabled={!race || race.status === RaceState.Started}
        >
          Take Reward
        </Button>
      </Box>
    </Card>
  );
};

export default RacePanel;
