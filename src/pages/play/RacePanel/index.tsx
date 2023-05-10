import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
// import moment from "moment";
import { Box, Button, Card } from "@mui/material";

import { useWallet } from "contexts/WalletProvider";
import { useTezrun } from "hooks/useTezrun";
import { useIndexer } from "hooks/useIndexer";
// import { finishRace } from "services";
import { setLoading } from "slices/play";
// import { RaceState } from "../types";
// import { defaultHorses } from "../horses";

const RacePanel = ({ status: raceStatus, unityContext }) => {
  const dispatch = useDispatch();
  const { address } = useWallet();
  const { takeReward } = useTezrun();
  const { getBalance, getRewards } = useIndexer();
  // const [resultHorses, setResultHorses] = useState<any[]>([]);
  const [gameStatus, setGameStatus] = useState(0);
  const { sendMessage, addEventListener, removeEventListener } = unityContext;

  /*const onFinishRace = useCallback(
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
  );*/

  const onGameState = useCallback((state: string) => {
    if (state === 'DISCONNECT') {
      setGameStatus(0);
    } else if (state === 'JOIN_SUCCESS') {
      setGameStatus(2);
    } else if (state === 'READY_SUCCESS') {
      setGameStatus(3);
    }
  }, []);

  useEffect(() => {
    console.log("Initialize Unity Events");
    addEventListener("GameState", onGameState);

    return () => {
      removeEventListener("GameState", onGameState);
    };
  }, [addEventListener, removeEventListener, onGameState]);

  const handleTakeReward = async () => {
    console.log("TakeReward", address);
    try {
      if (!address) {
        toast.error("Please connect your wallet!");
        return;
      }
      dispatch(setLoading(true));

      const rewards = await getRewards(address);
      if (rewards <= 0) {
        toast.success("There is no rewards");
        return;
      }

      const balance = await getBalance();
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
      toast.error("Insufficient Funds to Give Reward, Please contact support");
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

  const handleReady = () => {
    if (gameStatus === 0) {
      setGameStatus(1);
      sendMessage("RaceController", "JoinGame");
    } else if (gameStatus === 2) {
      sendMessage("RaceController", "Ready");
    }
  };

  /*const handleFinishRace = async () => {
    try {
      dispatch(setLoading(true));
      await finishRace();
      toast.success("The race is finished!");
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };*/

  const getGameStatusText = () => {
    if (gameStatus === 0) return "Connect";
    if (gameStatus === 1) return "Connecting";
    if (gameStatus === 2) return "Ready";
    if (gameStatus === 3) return "Waiting for other players";
    return "";
  };

  return (
    <Card sx={{ mt: 2, px: 1, py: 2 }}>
      <Box sx={{ textAlign: "center", mb: 1 }}>
        {/* <Button
          variant="contained"
          fullWidth
          size="medium"
          onClick={handleFinishRace}
          disabled={raceStatus !== RaceState.Started}
        >
          Debug: End Race
        </Button> */}
      </Box>
      <Box sx={{ textAlign: "center", mb: 1 }}>
        <Button
          variant="contained"
          fullWidth
          size="medium"
          onClick={handleReady}
          disabled={gameStatus === 1 || gameStatus === 3}
        >
          {getGameStatusText()}
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
