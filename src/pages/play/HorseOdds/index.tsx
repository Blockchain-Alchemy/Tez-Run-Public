import { Box, Card, Grid, Typography } from "@mui/material";
import { defaultHorses } from "../horses";

function HorseOdds() {
  return (
    <Card sx={{ my: 2 }}>
      <Box sx={{ textAlign: "center", py: 2 }}>
        <div>
          <Typography sx={{ mt: 1, mb: 2 }} variant="h5">
            Odds
          </Typography>
          {defaultHorses.map((horse, index) => (
            <Grid key={index} container spacing={0}>
              <Grid item sm={7} sx={{ textAlign: "right" }}>
                <Typography key={index} color="textSecondary" variant="body1">
                  {horse.name}
                </Typography>
              </Grid>
              <Grid item sm={5} sx={{ pl: 2, textAlign: "left" }}>
                <Typography key={index} color="textSecondary" variant="body1">
                  {horse.payout[0]} - {horse.payout[1]}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </div>
      </Box>
    </Card>
  );
}

export default HorseOdds;
