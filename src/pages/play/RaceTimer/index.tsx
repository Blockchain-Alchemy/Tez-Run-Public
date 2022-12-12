import { useEffect, useState } from "react";
import moment from "moment";
import { Box, Card, Typography } from "@mui/material";
import { Race, RaceState } from "../types";

type RaceTimerProps = {
  race: Race;
};

const RaceTimer = ({ race }: RaceTimerProps) => {
  const [remainTime, setRemainTime] = useState(0);

  useEffect(() => {
    if (race && race.status === RaceState.Ready) {
      const seconds = moment(race.start_time).diff(moment(), "seconds");
      console.log("seconds", seconds);
      setRemainTime(seconds);
    }
  }, [race]);

  // Start timer
  setTimeout(() => {
    if (remainTime > 0) {
      setRemainTime(remainTime - 1);
    }
  }, 1000);

  return (
    <Card>
      <Box
        sx={{
          textAlign: "center",
          px: 3,
          py: 2,
        }}
      >
        <div>
          <Typography sx={{ mt: 1, mb: 2 }} variant="h5">
            Race Starts in:
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {moment.utc(remainTime * 1000).format("HH:mm:ss")}
          </Typography>
        </div>
      </Box>
    </Card>
  );
};

export default RaceTimer;
