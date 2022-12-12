import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { setBanned } from "slices/play";
import useBeacon from "hooks/useBeacon";

export const DebugMenu = () => {
  const dispatch = useDispatch();
  const { address } = useBeacon();

  const injectionCheat = useCallback(() => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }
    const shortAddress = `${address.substring(0, 4)}...${address.substring(
      address.length - 4
    )}`;
    toast.error(`This address has been banned for cheating. ${shortAddress}`);
    
    dispatch(setBanned(true));

    // eslint-disable-next-line
  }, [dispatch, address]);

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Typography color="primary.main" variant="h3">
            Cheat Menu
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          onClick={injectionCheat}
        >
          JS Injection Cheat
        </Button>
      </CardActions>
    </Card>
  );
};
