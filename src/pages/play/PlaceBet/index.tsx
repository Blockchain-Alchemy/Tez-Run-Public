import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { TransactionWalletOperation } from "@taquito/taquito";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Input,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { useWallet } from "contexts/WalletProvider";
import { useTezrun } from "hooks/useTezrun";
import { addPendingTicket, removePendingTicket, setLoading } from "slices/play";
import { defaultHorses } from "../horses";
import { Race, RaceState, Ticket } from "../types";
import { Help } from "components/Help";

type Props = {
  race: Race;
};

function PlaceBet({ race }: Props) {
  const dispatch = useDispatch();
  const { connected } = useWallet();
  const { placeBet, getApproval, approve } = useTezrun();

  const nativeToken = true; //const [nativeToken, setNativeToken] = useState(true);
  const [horseId, setHorseId] = useState(0);
  const [betAmount, setBetAmount] = useState(0.001); //(1);//(0.001);
  const [selectedPlace, setSelectedPlace] = useState("win");
  const [payout, setPayout] = useState(0);

  const handleBet = async () => {
    if (!connected) {
      toast.error("Please connect your wallet!");
      return;
    }
    if (horseId === 0) {
      toast.error("Please select a horse!");
      return;
    }
    if (betAmount === 0) {
      toast.error("Please input bet amount!");
      return;
    }
    if (payout === 0) {
      toast.error("Please input payout amount!");
      return;
    }
    const horse = defaultHorses.find((it) => it.id === horseId);
    if (!horse) {
      return;
    }
    try {
      dispatch(setLoading(true));

      let op: TransactionWalletOperation | null = null;
      if (nativeToken) {
        const rate = Math.round(payout * 1000000);
        console.log("rate", rate, betAmount);
        op = await placeBet(horseId, rate, betAmount);
      } else {
        const approval = await getApproval();
        if (!approval) {
          const approved = await approve();
          if (!approved) {
            toast.error("Failed to approve");
            return;
          }
        }
        const rate = payout * 1000000;
        const tokenAmount = betAmount * 1000000;
        op = await placeBet(horseId, rate, 0, 1, tokenAmount);
      }
      if (op) {
        const ticket: Ticket = {
          id: uuidv4(),
          horseId,
          payout,
          token: nativeToken ? 0 : 1,
          tezos: nativeToken ? betAmount : 0,
          amount: nativeToken ? 0 : betAmount,
          pending: true,
        };
        console.log("ticket", ticket);
        dispatch(addPendingTicket(ticket));
        waitPendingTicket(op, ticket);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const waitPendingTicket = async (
    op: TransactionWalletOperation,
    ticket: Ticket
  ) => {
    op.confirmation().then(() => {
      console.log("~~~~~~~~~~~~~~~~~confirmed", ticket.id);
      dispatch(removePendingTicket(ticket.id!));
    });
  };

  const onChangeHorseId = (horseId) => {
    setHorseId(horseId);

    const horse = defaultHorses.find((it) => it.id === horseId);
    if (horse) {
      setPayout(betAmount * (horse.payout[0] / horse.payout[1]) + betAmount);
    }
  };

  const onChangeBetAmount = (betAmount) => {
    setBetAmount(betAmount);

    const horse = defaultHorses.find((it) => it.id === horseId);
    if (horse) {
      setPayout((betAmount / horse.payout[0]) * horse.payout[1] + betAmount);
    }
  };

  const tokenName = useMemo(() => {
    return nativeToken ? "ꜩ" : "uUSD";
  }, [nativeToken]);

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h5">Place Bet</Typography>}
        action={<Help title="Place Bet" content="Place your bet" />}
      />
      <Box sx={{ px: 3, pb: 2 }}>
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
              {defaultHorses.map((horse, index) => (
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
              onChange={(e) => onChangeBetAmount(Number(e.target.value))}
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
              disabled
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
              disabled
              value={parseFloat(payout?.toFixed(4))}
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
                disabled={!race || race.status === RaceState.Started}
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
