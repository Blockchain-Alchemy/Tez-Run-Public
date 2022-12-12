import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { UnityContextHook } from "react-unity-webgl/distribution/types/unity-context-hook";
import * as escrowService from "services";
import { setLoading } from "slices/play";
import { useEscrow } from "hooks/useEscrow";
import useBeacon from "hooks/useBeacon";
import useInterval from "hooks/useInterval";
import { ShowCheatMenu } from "configs";
import { RootState } from "store";
import { DebugMenu } from "../debug";
import { RewardModal } from "./rewardModal";

type EscrowProps = {
  unityContext: UnityContextHook;
};

export const Escrow = ({ unityContext }: EscrowProps) => {
  const dispatch = useDispatch();
  const { address } = useBeacon();
  const { deposit } = useEscrow();
  const { sendMessage, addEventListener, removeEventListener } = unityContext;
  const { banned } = useSelector((state: RootState) => state.play);
  const [balance, setBalance] = useState(0);
  const [playState, setPlayState] = useState(false);
  const [rewards, setRewards] = useState(false);

  const onRaceWon = (param) => {
    console.log("RaceWon", param);
    setPlayState(false);
    setRewards(true);
    toast.success("Congratulations. You won!");
  };

  const onRaceLost = (param) => {
    console.log("RaceLost", param);
    setPlayState(false);
    setRewards(false);
    toast.error("You lose!");
  };

  const getEscrow = async () => {
    const balance = await escrowService.getEscrowBalance();
    console.log("balance", balance);
    setBalance(balance);
  };

  useInterval(() => {
    getEscrow();
  }, 1000);

  useEffect(() => {
    getEscrow();

    addEventListener("RaceWon", onRaceWon);
    addEventListener("RaceLost", onRaceLost);
    return () => {
      removeEventListener("RaceWon", onRaceWon);
      removeEventListener("RaceLost", onRaceLost);
    };
    // eslint-disable-next-line
  }, []);

  const startGame = async () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }
    dispatch(setLoading(true));

    const result = await deposit();
    console.log("startGame", result);
    if (!!result) {
      sendMessage("GameManager", "StartRace");
      setPlayState(true);
      getEscrow();
    }
    dispatch(setLoading(false));
  };

  const takeReward = async () => {
    dispatch(setLoading(true));

    const result = await escrowService.takeRewards(address!);
    console.log("take, result", result);
    if (!!result) {
      setRewards(false);
      toast.success("You took rewards successfully");
    } else {
      toast.error("Admin does not have enough for gas, please contact support!");
    }
    dispatch(setLoading(false));
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" spacing={3}>
          <Grid item md={6} xs={12}>
            {!!ShowCheatMenu && <DebugMenu />}
          </Grid>
          <Grid item md={6} xs={12}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Typography color="primary.main" variant="h3">
                    Total in Escrow {balance}
                  </Typography>
                </Box>
                <Typography sx={{ mt: 2 }} variant="h6">
                  Add 1 tez to the prize pool to play!
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  If you beat the other racer - you win 2 tez. That's all there is to it. Enjoy!
                </Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={startGame}
                  disabled={!!playState || banned}
                >
                  Start Game
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={takeReward}
                  disabled={!!playState || !rewards}
                >
                  Take Reward
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
      {!!rewards && <RewardModal onClose={() => setRewards(false)} />}
    </Box>
  );
};
