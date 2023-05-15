import React from "react";
import toast from "react-hot-toast";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import { useHorseCollection } from "hooks/useHorseCollection";
import { useWallet } from "contexts/WalletProvider";

const NFTCard = ({ name, tokenId, imgUrl }: any) => {
  const { address } = useWallet();
  const { mintToken } = useHorseCollection();

  const handleMintToken = async () => {
    if (!address) {
      toast.error("Please connect your wallet!");
      return;
    }

    const toastId = toast.loading("Minting...");
    const result = await mintToken(tokenId);
    if (!result) {
      toast.error("Failed to mint token!", { id: toastId });
    } else {
      toast.success("You has been successfully minted token!", { id: toastId });
    }
  };

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
          <Button
            variant="contained"
            fullWidth
            size="medium"
            onClick={handleMintToken}
          >
            Mint
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default NFTCard;
