import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Grid } from "@mui/material";
import { Unity, useUnityContext } from "react-unity-webgl";

import { MainLayout } from "components/main-layout";
import Loader from "components/Loader";
import { useWallet } from "contexts/WalletProvider";
import { useIndexer } from "hooks/useIndexer";
import useInterval from "hooks/useInterval";

import { RootState } from "store";
import { Race, RaceState } from "./types";

import HorseOdds from "./HorseOdds";
import RaceTimer from "./RaceTimer";
import PlaceBet from "./PlaceBet";
import BetTicket from "./BetTicket";
import RacePanel from "./RacePanel";
import NFTCollection from "./NFTCollection";
import "./styles.css";
import { updateTickets } from "slices/play";

const unityConfig = {
  loaderUrl: "Build/public.loader.js",
  dataUrl: "Build/public.data",
  frameworkUrl: "Build/public.framework.js",
  codeUrl: "Build/public.wasm",
};

const Play = () => {
  const dispatch = useDispatch();
  const { address } = useWallet();
  const { getGameState } = useIndexer();
  const { loading, tickets } = useSelector((state: RootState) => state.play);
  const unityContext = useUnityContext(unityConfig);
  const { isLoaded, sendMessage } = unityContext;
  const [race, setRace] = useState<Race>({} as Race);
  const [loadingPercent, setLoadingPercent] = useState(0);

  useInterval(async () => {
    try {
      if (!isLoaded) {
        return;
      }

      const game = await getGameState();
      if (game.race) {
        setRace(game.race);
        const updatedState = game.race.status;
        if (updatedState) {
          if (
            race.status === RaceState.Ready &&
            updatedState === RaceState.Started
          ) {
            sendMessage("GameController", "StartRaceNow", 45);
          }
        }
      }
      if (address && game.tickets) {
        const tickets = game.tickets.filter((t) => t.address === address);
        dispatch(updateTickets(tickets));
      }
    } catch (err) {
      console.error(err);
    }
  }, 2000);

  useInterval(() => {
    setLoadingPercent((value) =>
      value <= 99 ? value + Math.random() / 100 : value
    );
  }, 20);

  const ticketView = useMemo(
    () => (
      <Box>
        <Grid container spacing={1}>
          {(tickets || []).map((ticket: any, index: number) => (
            <Grid item key={index} sm={3} xs={6}>
              <BetTicket key={index} ticket={ticket}></BetTicket>
            </Grid>
          ))}
        </Grid>
      </Box>
    ),
    [tickets]
  );

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
          <Box sx={{ mb: 4, mr: 2 }}>
            <Grid container spacing={0.5}>
              <Grid item sm={10} xs={12}>
                <div className="unity-container">
                  <Unity
                    unityProvider={unityContext.unityProvider}
                    style={{
                      height: 540,
                      width: 920,
                      background: "#555",
                    }}
                  />
                  {!isLoaded && (
                    <div className="unity-loader">
                      <div>Loading... {loadingPercent.toFixed(2)}%</div>
                    </div>
                  )}
                </div>
              </Grid>
              <Grid item sm={2} xs={12}>
                <RaceTimer race={race} />
                <HorseOdds />
                <RacePanel
                  status={race?.status}
                  unityContext={unityContext}
                ></RacePanel>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={1}>
              <Grid item sm={4} xs={12}>
                <PlaceBet race={race} />
              </Grid>
              <Grid item sm={8} xs={12}>
                {ticketView}
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mb: 4 }}>
            <NFTCollection />
          </Box>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default Play;
