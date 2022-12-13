import React from "react";
import { useSelector } from "react-redux";
import { Box, Card, CardContent, Container, Grid } from "@mui/material";
import { Unity, useUnityContext } from "react-unity-webgl";
import { MainLayout } from "components/main-layout";
import { RootState } from "store";
import Loader from "components/loader";
import "./styles.css";
import HorseOdds from "./HorseOdds";
import RaceTimer from "./RaceTimer";
import PlaceBet from "./PlaceBet";
import { Race } from "./types";

const unityConfig = {
  loaderUrl: "Build/1.loader.js",
  dataUrl: "Build/1.data",
  frameworkUrl: "Build/1.framework.js",
  codeUrl: "Build/1.wasm",
};

const race: Race = {
  admin: "admin",
  paused: false,
  race_id: 1,
  start_time: "2022-12-12 15:00:00",
  status: "1",
  winner: 1,
};

const Play = () => {
  const { loading } = useSelector((state: RootState) => state.play);
  const unityContext = useUnityContext(unityConfig);
  const { loadingProgression, isLoaded } = unityContext;

  return (
    <MainLayout>
      {loading && <Loader />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={0.5}>
              <Grid item sm={10} xs={12}>
                <Unity
                  unityProvider={unityContext.unityProvider}
                  style={{
                    height: 540,
                    width: 920,
                    background: "#555",
                  }}
                />
                {!isLoaded && loadingProgression > 0 && (
                  <div className="unity-loader">
                    <div>
                      Loading... {Math.round(loadingProgression * 100)}%
                    </div>
                  </div>
                )}
              </Grid>
              <Grid item sm={2} xs={12}>
                <RaceTimer race={race} />
                <HorseOdds />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={4}>
              <Grid item sm={4} xs={12}>
                <PlaceBet race={race} />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default Play;
