import {
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { X as XIcon } from "icons/x";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
};

export const HelpDialog = ({ onClose, open, title, content }: Props) => {
  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={!!open}>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 3 }}>
        <Typography align="center" gutterBottom variant="h5">
          {title}
        </Typography>
        <IconButton color="inherit" onClick={onClose}>
          <XIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box sx={{ p: 3 }}>{content}</Box>
      <Divider />
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          p: 2,
        }}
      >
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={onClose} type="submit" variant="contained">
          OK
        </Button>
        <Button sx={{ ml: 1 }}>
          More Info
        </Button>
      </Box>
    </Dialog>
  );
};
