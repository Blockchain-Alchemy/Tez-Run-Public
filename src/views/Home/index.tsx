import React from 'react';
import HorseOdds from './components/HorseOdds';
import RaceTimer from './components/RaceTimer';
import PlaceBet from './components/PlaceBet';
import BetTicket from './components/BetTicket';

function Home(props) {

  return (
    <div className="container mx-auto">
      <div className="container-odd">
        <div className="grid grid-cols-12 gap-4">
          <HorseOdds></HorseOdds>
          <div id="race-footage" className="col-start-3 col-span-8">
            <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl h-full">
              {/* <Unity unityContext={unityContext} /> */}
            </div>
          </div>
          <RaceTimer></RaceTimer>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-4 pt-4">
          <PlaceBet></PlaceBet>
          <BetTicket></BetTicket>
        </div>
      </div>
    </div>
  );
}

export default Home;
