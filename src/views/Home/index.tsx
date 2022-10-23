import React, { useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import { Race, RaceState } from "types";
import { getRaceState } from "services";
import { useInterval } from "hooks/useInterval";
import useBeacon from "hooks/useBeacon";
import HorseOdds from "./HorseOdds";
import RaceTimer from "./RaceTimer";
import PlaceBet from "./PlaceBet";
import BetTicketCard from "./BetTicket";
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

  useInterval(() => {
    getRaceState()
      .then((result) => {
        if (result.status) {
          console.log("RaceState", result);
          if (race.status === RaceState.Ready && result.status === RaceState.Started) {
            unityContext.send("GameController", "StartRaceNow", 45);
          }
        }
        setRace(result);
      })
      .catch(console.error);
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
            <BetTicketCard userAddress={address}></BetTicketCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
