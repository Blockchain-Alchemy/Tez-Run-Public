import React, { useState } from 'react';
import { TezosToolkit } from "@taquito/taquito";
import ConnectButton from "../../components/ConnectWallet";
//import Unity, { UnityContext } from "react-unity-webgl";
import Network from "../../network"
import HorseOdds from './components/HorseOdds';
import RaceTimer from './components/RaceTimer';
import PlaceBet from './components/PlaceBet';
import BetTicket from './components/BetTicket';

const defaultHorses = [
  'Hottez',
  'Snazzy Fukr',
  'Neonz',
  'Hic et Equum',
  'Breitmare',
  'Mandala',
];

function Home() {
  const [Tezos, setTeozos] = useState(new TezosToolkit(Network.rpcUrl));
  const [contract, setContract] = useState<any>(undefined);
  const [publicToken, setPublicToken] = useState<string | null>("");
  const [wallet, setWallet] = useState<any>(null);
  const [userAddress, setUserAddress] = useState<string>("");
  const [userBalance, setUserBalance] = useState<number>(0);
  const [storage, setStorage] = useState<number>(0);
  const [copiedPublicToken, setCopiedPublicToken] = useState<boolean>(false);
  const [beaconConnection, setBeaconConnection] = useState<boolean>(false);
  const contractAddress: string = "KT1WiPWNcBMcXJButkkvroRGkzs45n3iZ13c";
  
  const [horses, setHorses] = useState(defaultHorses);
  const [selectedHorse, setSelectedHorse] = useState('');
  const [betAmount, setBetAmount] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState('');
  const [placeAmount, setPlaceAmount] = useState(0);


  const handleBet = () => {
    console.log("handleBet");
  }

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
