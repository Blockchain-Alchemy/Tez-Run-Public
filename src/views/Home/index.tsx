import React, { useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import { Race, RaceState } from "types";
import { getGameState } from "services";
import { useInterval } from "hooks/useInterval";
import useBeacon from "hooks/useBeacon";
import HorseOdds from "./HorseOdds";
import RaceTimer from "./RaceTimer";
import PlaceBet from "./PlaceBet";
import BetTicket from "./BetTicket";
import RacePanel from "./RacePanel";
import Loader from "components/Loader";

const unityContext = new UnityContext({
  loaderUrl: "Build/1.loader.js",
  dataUrl: "Build/1.data",
  frameworkUrl: "Build/1.framework.js",
  codeUrl: "Build/1.wasm",
});

const Home = () => {
  const { loading, address } = useBeacon();
  const [race, setRace] = useState<Race>({} as Race);
  const [tickets, setTickets] = useState([]);

  useInterval(async () => {
    try {
      if (address) {
        const game = await getGameState(address);
        if (game.race) {
          setRace(game.race);
          const updatedState = game.race.status;
          if (updatedState) {
            if (
              race.status === RaceState.Ready &&
              updatedState === RaceState.Started
            ) {
              unityContext.send("GameController", "StartRaceNow", 45);
            }
          }
        }
        if (game.tickets) {
          const tickets = game.tickets.map((ticket: any) => {
            return {
              horseId: Number(ticket.horse_id),
              payout: Number(ticket.payout),
              token: Number(ticket.token),
              tezos: Number(ticket.tezos),
              amount: Number(ticket.amount),
            };
          });
          setTickets(tickets);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, 2000);

  return (
    <div className="container mx-auto">
      {loading && <Loader />}
      <div className="px-4 mt-4 md:mt-8">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-2">
            <HorseOdds></HorseOdds>
          </div>
          <div
            id="race-footage"
            className="col-span-12 lg:col-start-3 lg:col-span-8"
          >
            <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl h-full">
              <Unity className="w-full" unityContext={unityContext} />
            </div>
          </div>
          <div
            id="race-state-card"
            className="col-span-12 lg:col-start-11 lg:col-span-2"
          >
            <RaceTimer race={race}></RaceTimer>
            <RacePanel unityContext={unityContext}></RacePanel>
          </div>
        </div>
      </div>
      <div className="px-4 my-4 md:mt-8">
        <div className="grid grid-cols-12 gap-4">
          <div
            id="place-bet-card"
            className="col-span-12 md-col-span-6 lg:col-span-3"
          >
            <PlaceBet race={race}></PlaceBet>
          </div>
          <div className="col-span-12 md-col-span-6 lg:col-start-4 lg:col-span-9">
            <div className="flex gap-4">
              {(tickets || []).map((ticket: any, index: number) => (
                <BetTicket key={index} ticket={ticket}></BetTicket>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
