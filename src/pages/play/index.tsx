import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Container, Grid } from "@mui/material";
import { Unity, useUnityContext } from "react-unity-webgl";

import { MainLayout } from "components/main-layout";
import Loader from "components/loaders";
import useBeacon from "hooks/useBeacon";
import useInterval from "hooks/useInterval";

import { getGameState } from "services";
import { RootState } from "store";
import { Race, RaceState } from "./types";

import HorseOdds from "./HorseOdds";
import RaceTimer from "./RaceTimer";
import PlaceBet from "./PlaceBet";
import BetTicket from "./BetTicket";
import RacePanel from "./RacePanel";
import "./styles.css";

const unityConfig = {
  loaderUrl: "Build/1.loader.js",
  dataUrl: "Build/1.data",
  frameworkUrl: "Build/1.framework.js",
  codeUrl: "Build/1.wasm",
};

const Play = () => {
  const { indexer, address } = useBeacon();
  const { loading } = useSelector((state: RootState) => state.play);
  const unityContext = useUnityContext(unityConfig);
  const { loadingProgression, isLoaded, sendMessage } = unityContext;
  const [race, setRace] = useState<Race>({} as Race);
  const [tickets, setTickets] = useState<any[]>([]);

  useInterval(async () => {
    try {
      const game = await getGameState(indexer);
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
        const tickets = game.tickets
          .filter((t) => t.address === address)
          .map((ticket: any) => {
            return {
              horseId: Number(ticket.horse_id),
              payout: Number(ticket.payout) / 1000000,
              token: Number(ticket.token),
              tezos: Number(ticket.tezos),
              amount: Number(ticket.amount),
            };
          });
        setTickets(tickets);
      }
    } catch (err) {
      console.error(err);
    }
  }, 2000);

  const ticketList = () => (
    <Box>
      <Grid container spacing={1}>
        {(tickets || []).map((ticket: any, index: number) => (
          <Grid item key={index} sm={3} xs={6}>
            <BetTicket key={index} ticket={ticket}></BetTicket>
          </Grid>
        ))}
      </Grid>
    </Box>
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
                  {!isLoaded && loadingProgression > 0 && (
                    <div className="unity-loader">
                      <div>
                        Loading... {Math.round(loadingProgression * 100)}%
                      </div>
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
                {ticketList()}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default Play;
