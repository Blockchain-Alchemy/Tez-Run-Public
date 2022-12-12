import React, { useCallback, CSSProperties } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import toast from "react-hot-toast";
import { Check as CheckIcon } from "icons/check";
import * as escrowService from "services";
import { setLoading } from "slices/play";
import useBeacon from "hooks/useBeacon";

const LoadBox = {
  position: "fixed",
  width: "100%",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: "rgb(0,0,0, 0.7)",
  zIndex: 100,
  display: "flex",
} as CSSProperties;

const IconContainer = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
} as CSSProperties;

type RewardModalProps = {
  onClose: () => void;
};

export const RewardModal = ({ onClose }: RewardModalProps) => {
  const dispatch = useDispatch();
  const { address } = useBeacon();

  const takeReward = useCallback(async () => {
    dispatch(setLoading(true));

    const result = await escrowService.takeRewards(address!);
    console.log("take, result", result);
    if (!!result) {
      toast.success("You took rewards successfully");
      onClose();
    } else {
      toast.error(
        "Admin does not have enough for gas, please contact support!"
      );
    }
    dispatch(setLoading(false));
    // eslint-disable-next-line
  }, [dispatch, address]);

  return (
    <div style={LoadBox}>
      <div style={IconContainer}>
        <Box
          sx={{
            minHeight: "100%",
            minWidth: "520px",
          }}
        >
          <Container maxWidth="sm">
            <Paper elevation={12} sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor: (theme) =>
                      alpha(theme.palette.success.main, 0.08),
                    color: "success.main",
                    mb: 2,
                  }}
                >
                  <CheckIcon fontSize="small" />
                </Avatar>
                <Typography color="textPrimary" variant="h5">
                  Game Won
                </Typography>
                <Typography
                  align="center"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                  variant="body2"
                >
                  You've won, now you can take your reward!
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mt: 4,
                }}
              >
                <Button
                  fullWidth
                  size="large"
                  sx={{ mr: 2 }}
                  variant="outlined"
                  onClick={onClose}
                >
                  Later
                </Button>
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  onClick={() => takeReward()}
                >
                  Claim Reward
                </Button>
              </Box>
            </Paper>
          </Container>
        </Box>
      </div>
    </div>
  );
};
