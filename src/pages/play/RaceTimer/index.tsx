import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Box, Button, Card, Typography } from "@mui/material";
import { Race, RaceState } from "../types";
import { finishRace } from "services";
import { toast } from "react-hot-toast";
import { setLoading } from "slices/play";

type RaceTimerProps = {
  race: Race;
};

const RaceTimer = ({ race }: RaceTimerProps) => {
  const dispatch = useDispatch();
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

  const handleEndRace = async () => {
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
    <Card>
      <Box sx={{ textAlign: "center", px: 3, py: 2 }}>
        <Typography sx={{ mt: 1, mb: 2 }} variant="h5">
          {raceState}:
        </Typography>
        <Typography color="textSecondary" variant="body1">
          {moment.utc(remainTime * 1000).format("HH:mm:ss")}
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center", px: 1, py: 2 }}>
        <Button
          variant="contained"
          fullWidth
          size="medium"
          onClick={handleEndRace}
          disabled={!race || race.status !== RaceState.Started}
        >
          Debug: End Race
        </Button>
      </Box>
    </Card>
  );
};

export default RaceTimer;
