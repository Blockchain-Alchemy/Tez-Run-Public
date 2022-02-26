import React, { useState } from 'react';

const defaultHorses = [
  'Hottez',
  'Snazzy Fukr',
  'Neonz',
  'Hic et Equum',
  'Breitmare',
  'Mandala',
];

function PlaceBet() {
  const [horses, setHorses] = useState(defaultHorses);
  const [selectedHorse, setSelectedHorse] = useState('');
  const [betAmount, setBetAmount] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState('');
  const [placeAmount, setPlaceAmount] = useState(0);

  const handleBet = () => {
    console.log("handleBet");

    /*unityContext.on("FinishedRace", (HorseName, time) => {
      console.log("FinishedRace", HorseName, time);
    });

    unityContext.send("GameController", "StartRace", 192301923123);*/
  }

  return (
    <div id="place-bet-card" className="col-span-3">
      <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl mr-4">
        <div className="px-6 text-center">
          <h3 className="flex text-slate-900 dark:text-white mb-5 text-base font-medium tracking-tight">Place Bet</h3>
          
          <div className="w-full py-1.5">
            <select
              className="form-select block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border  border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"
              defaultValue={selectedHorse}
              onChange={(e) => setSelectedHorse(e.target.value)}
            >
              <option disabled value="">Select Horse</option>
              { horses.map((horse, index) => (
                <option key={index} value={horse}>{horse}</option>
              ))}
            </select>
          </div>

          <div className="w-full py-1.5">
            <input
              type="number"
              min="0"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Bet Amount"
              value={betAmount}
              onChange={e => setBetAmount(Number(e.target.value))}
            />
          </div>
          
          <div className="w-full py-1.5">
            <select 
              className="form-select block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Default select example"
              defaultValue={selectedPlace}
              onChange={(e) => setSelectedPlace(e.target.value)}
            >
              <option value="" disabled>To Win</option>
              <option value="win">Win</option>
              <option value="place">Place</option>
              <option value="show">Show</option>
            </select>
          </div>

          <div className="w-full py-1.5">
            <input
              type="number"
              min="0"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Place Bet"
              value={placeAmount}
              onChange={e => setPlaceAmount(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="flex justify-center w-full py-1.5 mt-2">
          <button 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleBet}
          >Bet</button>
        </div>
      </div>
    </div>
  );
}

export default PlaceBet;
