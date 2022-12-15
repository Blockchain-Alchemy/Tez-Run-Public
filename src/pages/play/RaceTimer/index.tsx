import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { Box, Card, Typography } from "@mui/material";
import { Race, RaceState } from "../types";

type RaceTimerProps = {
  race: Race;
};

const RaceTimer = ({ race }: RaceTimerProps) => {
  const [remainTime, setRemainTime] = useState(0);

  useEffect(() => {
    if (race) {
      if (race.status === RaceState.Ready) {
        const seconds = moment(race.start_time).diff(moment(), "seconds");
        setRemainTime(seconds);
      } else if (race.status === RaceState.Started) {
        const seconds = 600 - moment().diff(moment(race.start_time), "seconds");
        setRemainTime(seconds);
      }
    }
  }, [race?.status]);

  // Start timer
  setTimeout(() => {
    if (remainTime > 0) {
      setRemainTime(remainTime - 1);
    }
  }, 1000);

  const raceState = useMemo(() => {
    if (race) {
      if (race.status === RaceState.Ready) {
        return "Race Starts in";
      } else if (race.status === RaceState.Started) {
        return "Race Ends in";
      }
    }
    return "Race Timer";
  }, [race]);

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
