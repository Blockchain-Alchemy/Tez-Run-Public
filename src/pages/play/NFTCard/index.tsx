import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  Button,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";

const NFTCard = ({ name, imgUrl }: any) => {
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 200 }} image={imgUrl} title="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" fullWidth size="medium">
            Mint
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default NFTCard;
