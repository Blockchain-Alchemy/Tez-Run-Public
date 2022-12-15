import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { Box, Card, Typography } from "@mui/material";
import { Race, RaceState } from "../types";

type RaceTimerProps = {
  race: Race;
};

const RaceTimer = ({ race }: RaceTimerProps) => {
  const [remainTime, setRemainTime] = useState(0);
  const { status, start_time } = race || {};

  useEffect(() => {
    if (status === RaceState.Ready) {
      const seconds = moment(start_time).diff(moment(), "seconds");
      setRemainTime(seconds);
    } else if (status === RaceState.Started) {
      const seconds = 600 - moment().diff(moment(start_time), "seconds");
      setRemainTime(seconds);
    }
  }, [status, start_time]);

  // Start timer
  setTimeout(() => {
    if (remainTime > 0) {
      setRemainTime(remainTime - 1);
    }
  }, 1000);

  const raceState = useMemo(() => {
    if (status === RaceState.Ready) {
      return "Race Starts in";
    } else if (status === RaceState.Started) {
      return "Race Ends in";
    }
    return "Race Timer";
  }, [status]);

  return (
    <Card>
      <Box sx={{ textAlign: "center", px: 3, py: 2 }}>
        <Typography sx={{ mt: 1, mb: 2 }} variant="h5">
          {raceState}:
        </Typography>
        <Typography color="textSecondary" variant="body1">
          {moment.utc(remainTime * 1000).format("HH:mm:ss")}
        </Typography>
      </Box>
    </Card>
  );
};

export default RaceTimer;
