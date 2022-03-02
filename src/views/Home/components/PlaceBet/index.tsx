import { useState } from 'react';
import useToast from 'hooks/useToast'

const defaultHorses = [
  { id: 1, name: 'Hottez' },
  { id: 1, name: 'Snazzy Fukr' },
  { id: 1, name: 'Neonz' },
  { id: 1, name: 'Hic et Equum' },
  { id: 1, name: 'Breitmare' },
  { id: 1, name: 'Mandala' },
];

function PlaceBet() {  
  const [horses, setHorses] = useState(defaultHorses);
  const [horseId, setHorseId] = useState(0);
  const [betAmount, setBetAmount] = useState(0.01);
  const [selectedPlace, setSelectedPlace] = useState('win');
  const [payout, setPayout] = useState(1);

  const { toastError } = useToast()

  const handleBet = () => {
    console.log("handleBet");
    if (horseId === 0) {
      toastError('Validation Error', 'Please select horse');
      return;
    }
    if (betAmount === 0) {

    }
    if (payout === 0) {

    }
  }

  return (  
    <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl lg:mr-4">
      <div className="px-8">
        <div className="w-100 text-center">
          <h3 className="flex text-slate-900 dark:text-white mb-5 text-base font-medium tracking-tight">Place Bet</h3>
        </div>

        <div className="w-full py-1.5">
          <label htmlFor="selectHorse" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select Horse:</label>
          <select
            id="selectHorse"
            className="form-select block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border  border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"
            defaultValue={horseId}
            onChange={(e) => setHorseId(Number(e.target.value))}
          >
            <option disabled value="">Select Horse</option>
            { horses.map((horse, index) => (
              <option key={index} value={horse.id}>{horse.name}</option>
            ))}
          </select>
        </div>

        <div className="w-full py-1.5">
          <label htmlFor="betAmount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Bet Amount:</label>
          <input
            id="betAmount"
            type="number"
            min="0"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Bet Amount"
            value={betAmount}
            onChange={e => setBetAmount(Number(e.target.value))}
          />
        </div>
        
        <div className="w-full py-1.5">
          <label htmlFor="selectPlace" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select Place:</label>
          <select 
            id="selectPlace"
            className="form-select block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Default select example"
            defaultValue={selectedPlace}
            onChange={(e) => setSelectedPlace(e.target.value)}
          >
            <option value="" disabled>To Win</option>
            <option value="win">Win</option>
            <option value="place" disabled>Place</option>
            <option value="show" disabled>Show</option>
          </select>
        </div>

        <div className="w-full py-1.5">
          <label htmlFor="payout" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Payout:</label>
          <input
            id="payout"
            type="number"
            min="0"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Place Bet"
            value={payout}
            onChange={e => setPayout(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="flex justify-center w-full py-1.5 mt-2">
        <button 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-36"
          onClick={handleBet}
        >Bet</button>
      </div>
    </div>
  );
}

export default PlaceBet;
