import { useState } from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import { defaultHorses } from "../horses";

function HorseOdds() {
  const [horses, setHorses] = useState(defaultHorses);

  return (
    <Card sx={{ my: 2 }}>
      <Box sx={{ textAlign: "center", py: 2 }}>
        <div>
          <Typography sx={{ mt: 1, mb: 2 }} variant="h5">
            Odds
          </Typography>
          <Grid container spacing={1}>
            {horses.map((horse, index) => (
              <>
                <Grid item sm={7} sx={{ textAlign: "right" }}>
                  <Typography key={index} color="textSecondary" variant="body1">
                    {horse.name}
                  </Typography>
                </Grid>
                <Grid item sm={5}>
                  <Typography key={index} color="textSecondary" variant="body1">
                    1 : {horse.payout}
                  </Typography>
                </Grid>
              </>
            ))}
          </Grid>
        </div>
      </Box>
    </Card>
  );
}

export default HorseOdds;
