import { useMemo } from "react";
import { Box, Card, CardHeader, Typography } from "@mui/material";
import { defaultHorses } from "../horses";
import { Help } from "components/Help";
import { Ticket } from "../types";
import { convertToTezos, convertToken } from "utils/tezos";

interface Props {
  ticket: Ticket;
}

const BetTicket = ({ ticket }: Props) => {
  const horseName = useMemo(() => {
    const horse = defaultHorses.find((it) => it.id === ticket.horseId);
    return horse?.name;
  }, [ticket]);

  const balance = useMemo(() => {
    if (ticket.token === 0) {
      return convertToTezos(ticket.tezos);
    } else {
      return convertToken(ticket.amount);
    }
  }, [ticket]);

  const unitName = useMemo(() => {
    return ticket.token === 0 ? "ꜩ" : "uUSD";
  }, [ticket]);

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h5">Bet Ticket</Typography>}
        action={<Help title="Bet Ticket" content="Bet Ticket" />}
      />
      <Box sx={{ px: 3, py: 2 }}>
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
        {!!ticket.pending && (
          <Typography color="textSecondary" variant="body1">
            <span>Adding Bet to Blockchain...</span>
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default BetTicket;
