import { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Input,
  Grid,
  Switch,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
// import useToast from "hooks/useToast";
// import useBeacon from "hooks/useBeacon";
// import useTezrun from "hooks/useTezrun";
import { defaultHorses } from "../horses";
import { RaceState } from "../types";

function PlaceBet({ race }) {
  //const { connected } = useBeacon();
  //const { placeBet, getApproval, approve } = useTezrun();
  //const { toastError } = useToast();

  const [horses, setHorses] = useState(defaultHorses);
  const [nativeToken, setNativeToken] = useState(true);
  const [horseId, setHorseId] = useState(0);
  const [betAmount, setBetAmount] = useState(0.004);
  const [selectedPlace, setSelectedPlace] = useState("win");
  const [payout, setPayout] = useState(0);

  const handleBet = async () => {
    // if (!connected) {
    //   toastError("Validation Error", "Please Connect Your Wallet");
    //   return;
    // }
    // if (horseId === 0) {
    //   toastError("Validation Error", "Please select horse");
    //   return;
    // }
    // if (betAmount === 0) {
    //   toastError("Validation Error", "Please input bet amount");
    //   return;
    // }
    // if (payout === 0) {
    //   toastError("Validation Error", "Please input payout amount");
    //   return;
    // }
    // const horse = horses.find((it) => it.id === horseId);
    // if (!horse) {
    //   return;
    // }
    // if (nativeToken) {
    //   await placeBet(horseId, horse.payout, betAmount);
    // } else {
    //   const approval = await getApproval();
    //   if (!approval) {
    //     const approved = await approve();
    //     if (!approved) {
    //       toastError("Validation Error", "Failed to approve");
    //       return;
    //     }
    //   }
    //   const tokenAmount = betAmount * 1000000000000;
    //   await placeBet(horseId, horse.payout, 0, 1, tokenAmount);
    // }
  };

  const onChangeHorseId = (horseId) => {
    setHorseId(horseId);

    const horse = horses.find((it) => it.id === horseId);
    if (horse) {
      setPayout(horse.payout * betAmount);
    }
  };

  const onChangeBetAmount = (betAmount) => {
    setBetAmount(betAmount);

    const horse = horses.find((it) => it.id === horseId);
    if (horse) {
      setPayout(horse.payout * betAmount);
    }
  };

  const betButtonStyle = useMemo(() => {
    //return "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-36";
    if (race.status !== RaceState.Ready) {
      return "text-white bg-gray-400 dark:bg-gray-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center w-36";
    } else {
      return "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-36";
    }
  }, [race]);

  const tokenName = useMemo(() => {
    return nativeToken ? "ꜩ" : "uUSD";
  }, [nativeToken]);

  return (
    <Card>
      <Box sx={{ px: 3, py: 2 }}>
        <Typography sx={{ mt: 1, mb: 2 }} variant="h5">
          Place Bet
        </Typography>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item sm={6}>
            <Typography color="textSecondary" variant="body1">
              Select Horse:
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <Select
              fullWidth
              value={horseId}
              onChange={(e) => onChangeHorseId(Number(e.target.value))}
            >
              <MenuItem value={0}>Select Horse</MenuItem>
              {horses.map((horse, index) => (
                <MenuItem key={index} value={horse.id}>
                  {horse.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item sm={6}>
            <Typography color="textSecondary" variant="body1">
              Bet Amount ({tokenName}):
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <Input
              disableUnderline
              fullWidth
              placeholder="Tezos"
              sx={{
                p: 1,
                borderBottom: 1,
                borderColor: "divider",
              }}
              value={betAmount}
            />
          </Grid>

          <Grid item sm={6}>
            <Typography color="textSecondary" variant="body1">
              Select Place:
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <Select
              fullWidth
              value={selectedPlace}
              onChange={(e) => setSelectedPlace(e.target.value)}
            >
              <MenuItem value={""}>To Win</MenuItem>
              <MenuItem value={"win"}>Win</MenuItem>
              <MenuItem value={"place"}>Place</MenuItem>
              <MenuItem value={"show"}>Show</MenuItem>
            </Select>
          </Grid>

          <Grid item sm={6}>
            <Typography color="textSecondary" variant="body1">
              Payout ({tokenName}):
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <Input
              disableUnderline
              fullWidth
              placeholder="Tezos"
              sx={{
                p: 1,
                borderBottom: 1,
                borderColor: "divider",
              }}
              value={payout?.toFixed(4)}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ px: 3, py: 2 }}>
        <div>
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item sm={6}></Grid>
            <Grid item sm={6}>
              <Button
                variant="contained"
                fullWidth
                size="medium"
                onClick={handleBet}
              >
                Bet
              </Button>
            </Grid>
          </Grid>
        </div>
      </Box>
    </Card>
  );
}

export default PlaceBet;
