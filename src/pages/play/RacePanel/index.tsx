import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import moment from "moment";
import { Box, Button, Card } from "@mui/material";

import useTezrun from "hooks/useTezrun";
import useBeacon from "hooks/useBeacon";
import { defaultHorses } from "../horses";
import { finishRace, getBalance, getRewards } from "services";
import { Mainnet } from "configs";
import { setLoading } from "slices/play";
import { RaceState } from "../types";

const RacePanel = ({ status, unityContext }) => {
  const dispatch = useDispatch();
  const { indexer, address } = useBeacon();
  const { takeReward } = useTezrun();
  const [resultHorses, setResultHorses] = useState<any[]>([]);
  const { addEventListener, removeEventListener } = unityContext;

  const onFinishRace = useCallback(
    async (name: string, time: string) => {
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
          //await finishRace(horse.id);
        }
      }
    },
    [resultHorses]
  );

  useEffect(() => {
    console.log("Initialize Unity Events");
    addEventListener("FinishedRace", onFinishRace);

    return () => {
      removeEventListener("FinishedRace", onFinishRace);
    };
  }, [addEventListener, removeEventListener, onFinishRace]);

  const handleTakeReward = async () => {
    console.log("TakeReward", address);
    try {
      if (!address) {
        toast.error("Please connect your wallet!");
        return;
      }
      dispatch(setLoading(true));

      const rewards = await getRewards(indexer, address);      
      if (rewards <= 0) {
        toast.success("There is no rewards");
        return;
      }

      const balance = await getBalance(indexer, Mainnet.TezRun);
      console.log("rewards", balance, rewards);
      if (balance < rewards) {
        toast.error(
          "Insufficient Funds to Give Reward, Please contact support"
        );
        return;
      }

      await takeReward();
      toast.success("You got reward successfully");
    } catch (e) {
      console.error(e);
      toast.error(
        "Insufficient Funds to Give Reward, Please contact support"
      );
    } finally {
      dispatch(setLoading(false));
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
          disabled={status !== RaceState.Started}
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
        >
          Take Reward
        </Button>
      </Box>
    </Card>
  );
};

export default RacePanel;
