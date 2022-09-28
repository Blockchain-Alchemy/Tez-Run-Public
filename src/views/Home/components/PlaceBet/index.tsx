import { useMemo, useState } from 'react';
import Switch from 'components/Switch'
import useToast from 'hooks/useToast'
import useBeacon from 'hooks/useBeacon';
import useTezrun from 'hooks/useTezrun';
import {defaultHorses} from 'hourse';
import {RaceState} from 'config';
import {updateBetting} from 'services';

function PlaceBet({ raceState }) {
  const {connected} = useBeacon();
  const {placeBet, takeReward, placeBetByToken, getApproval, approve} = useTezrun();
  const {toastError} = useToast();

  const [horses, setHorses] = useState(defaultHorses);
  const [nativeToken, setNativeToken] = useState(true);
  const [horseId, setHorseId] = useState(0);
  const [betAmount, setBetAmount] = useState(0.08);
  const [selectedPlace, setSelectedPlace] = useState("win");
  const [payout, setPayout] = useState(0);

  const handleBet = async () => {
    console.log("handleBet", connected);
    if (!connected) {
      toastError("Validation Error", "Please Connect Your Wallet");
      return;
    }

    if (horseId === 0) {
      toastError("Validation Error", "Please select horse");
      return;
    }
    if (betAmount === 0) {
      toastError("Validation Error", "Please input bet amount");
      return;
    }
    if (payout === 0) {
      toastError("Validation Error", "Please input payout amount");
      return;
    }

    const horse = horses.find(it => it.id === horseId)
    if (!horse) {
      return;
    }

    const raceId = 1;
    console.log("nativeToken", nativeToken)
    if (!nativeToken) {
      const approval = await getApproval();
      if (!approval) {
        const approved = await approve();
        if (!approved) {
          toastError("Validation Error", "Failed to approve");
          return;
        }
      }
      await placeBetByToken(raceId, horseId, horse.payout, betAmount);
    }
    else {
      await placeBet(raceId, horseId, horse.payout, betAmount);
    }

    await updateBetting(raceId, horseId, horse.payout, betAmount)
  };

  const onChangeHorseId = (horseId) => {
    setHorseId(horseId);

    const horse = horses.find(it => it.id === horseId)
    if (horse) {
      setPayout(horse.payout * betAmount);
    }
  }

  const onChangeBetAmount = (betAmount) => {
    setBetAmount(betAmount);

    const horse = horses.find(it => it.id === horseId)
    if (horse) {
      setPayout(horse.payout * betAmount);
    }
  }

  const betButtonStyle = useMemo(() => {
    return "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-36";
    /*if (raceState !== RaceState.Ready) {
      return "text-white bg-gray-400 dark:bg-gray-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center w-36"
    } else {
      return "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-36"
    }*/
  }, [raceState]);

  const tokenName = useMemo(() => {
    return nativeToken ? 'ꜩ' : 'uUSD';
  }, [nativeToken])

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl lg:mr-4">
      <div className="px-8">
        <div className="w-100 text-center">
          <h3 className="flex text-slate-900 dark:text-white mb-5 text-base font-medium tracking-tight">
            Place Bet
          </h3>
        </div>

        <div className="w-full py-1.5">
          <Switch
            toggle={nativeToken}
            setToggle={setNativeToken}
            labelOff="uUSD"
            labelOn="Tezos"
          ></Switch>
        </div>

        <div className="w-full py-1.5">
          <label
            htmlFor="selectHorse"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Select Horse:
          </label>
          <select
            id="selectHorse"
            className="form-select block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border  border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Default select example"
            defaultValue={horseId}
            onChange={(e) => onChangeHorseId(Number(e.target.value))}
          >
            <option disabled value="0">Select Horse</option>
            {horses.map((horse, index) => (
              <option key={index} value={horse.id}>
                {horse.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full py-1.5">
          <label
            htmlFor="betAmount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Bet Amount ({tokenName}):
          </label>
          <input
            id="betAmount"
            type="number"
            min="0"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Bet Amount"
            value={betAmount}
            onChange={(e) => onChangeBetAmount(Number(e.target.value))}
          />
        </div>

        <div className="w-full py-1.5">
          <label
            htmlFor="selectPlace"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Select Place:
          </label>
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
          <label
            htmlFor="payout"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Payout ({tokenName}):
          </label>
          <input
            id="payout"
            type="number"
            min="0"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Place Bet"
            readOnly={true}
            value={payout}
          />
        </div>
      </div>

      <div className="flex justify-center w-full py-1.5 mt-2">
        <button
          className={betButtonStyle}
          disabled={raceState !== RaceState.Ready}
          onClick={handleBet}
        >
          Bet
        </button>
      </div>
    </div>
  );
}

export default PlaceBet;
