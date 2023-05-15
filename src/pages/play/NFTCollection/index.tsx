import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Grid } from "@mui/material";
import styled from "@emotion/styled";
import NFTCard from "../NFTCard";

const NFTCollection = () => {
  return (
    <Grid container justifyContent="space-between" spacing={2}>
      <Grid item>
        <NFTCard name="Hottez" imgUrl="/tez_run_nft.jpg" />
      </Grid>
      <Grid item>
        <NFTCard name="Snazzy FKR" imgUrl="/tez_run_nft.jpg" />
      </Grid>
      <Grid item>
        <NFTCard name="Neonz" imgUrl="/tez_run_nft.jpg" />
      </Grid>
    </Grid>
  );
};

export default NFTCollection;
