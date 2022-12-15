import { useMemo } from "react";
import { Box, Card, Typography } from "@mui/material";
import { defaultHorses } from "../horses";

const convertTezos = (mutez) => {
  return mutez / 1000000;
};

const convertToken = (token) => {
  return token / 1000000000000;
};

const BetTicket = ({ ticket }) => {
  const horseName = useMemo(() => {
    const horse = defaultHorses.find((it) => it.id === ticket.horseId);
    return horse?.name;
  }, [ticket]);

  const balance = useMemo(() => {
    if (ticket.token === 0) {
      return convertTezos(ticket.tezos);
    } else {
      return convertToken(ticket.amount);
    }
  }, [ticket]);

  const unitName = useMemo(() => {
    return ticket.token === 0 ? "ꜩ" : "uUSD";
  }, [ticket]);

  return (
    <Card>
      <Box sx={{ px: 3, py: 2 }}>
        <Typography sx={{ mt: 1, mb: 2 }} variant="h5">
          Bet Ticket
        </Typography>
        <Typography color="textSecondary" variant="body1">
          {horseName}
        </Typography>
        <Typography color="textSecondary" variant="body1">
          To Win:
        </Typography>
        <Typography color="textSecondary" variant="body1">
          <span>Bet Placed: </span>
          <span className="text-slate-900 dark:text-white mb-5 text-base font-medium">
            {balance}
          </span>{" "}
          {unitName}
        </Typography>
        <Typography color="textSecondary" variant="body1">
          <span>Will Win: </span>
          <span className="text-slate-900 dark:text-white mb-5 text-base font-medium">
            {Number((balance * ticket.payout).toFixed(4))}
          </span>{" "}
          {unitName}
        </Typography>
      </Box>
    </Card>
  );
};

export default BetTicket;
