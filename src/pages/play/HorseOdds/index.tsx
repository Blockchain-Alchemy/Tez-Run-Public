import { Box, Card, CardHeader, Grid, Typography } from "@mui/material";
import { defaultHorses } from "../horses";
import { Help } from "components/Help";

function HorseOdds() {
  return (
    <Card sx={{ my: 2 }}>
      <CardHeader
        title={
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Odds
          </Typography>
        }
        action={<Help title="Odds" content="Odds" />}
      />
      <Box sx={{ textAlign: "center", pb: 2 }}>
        <div>
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
