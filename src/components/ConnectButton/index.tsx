import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { useWallet } from "contexts/WalletProvider";
import { setBanned } from "slices/play";

export const ConnectButton = () => {
  const dispatch = useDispatch();
  const { address, connectWallet, disconnectWallet } = useWallet();

  const connect = () => {
    dispatch(setBanned(false));
    if (!address) {
      connectWallet();
    } else {
      disconnectWallet();
    }
  };

  return (
    <Button
      component="a"
      size="medium"
      sx={{ ml: 2 }}
      target="_blank"
      variant="contained"
      onClick={connect}
    >
      {!address ? "Connect Wallet" : "Disconnect"}
    </Button>
  );
};
