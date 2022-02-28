import React from 'react';
import HorseOdds from './components/HorseOdds';
import RaceTimer from './components/RaceTimer';
import PlaceBet from './components/PlaceBet';
import BetTicket from './components/BetTicket';

function Home(props) {

  return (
    <div className="container mx-auto">
      <div className="px-4 mt-4 md:mt-8">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-2">
            <HorseOdds></HorseOdds>
          </div>
          <div id="race-footage" className="col-span-12 lg:col-start-3 lg:col-span-8">
            <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl h-full">
              {/* <Unity unityContext={unityContext} /> */}
            </div>
          </div>
          <div id="race-state-card" className="col-span-12 lg:col-start-11 lg:col-span-2">
            <RaceTimer></RaceTimer>
          </div>
        </div>
      </div>
      <div className="px-4 my-4 md:mt-8">
        <div className="grid grid-cols-12 gap-4">
          <div id="place-bet-card" className="col-span-12 lg:col-span-3">
            <PlaceBet></PlaceBet>
          </div>
          <div className="col-span-12 lg:col-start-4 lg:col-span-2">
            <BetTicket></BetTicket>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
