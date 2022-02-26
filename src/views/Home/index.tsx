import React, { useState } from 'react';
import { TezosToolkit } from "@taquito/taquito";
import ConnectButton from "../../components/ConnectWallet";
//import Unity, { UnityContext } from "react-unity-webgl";
import Network from "../../network"

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

  console.log("userAddress", userAddress)


  /*const unityContext = new UnityContext({
    loaderUrl: "./Build/1.loader.js",
    dataUrl: "./Build/1.data",
    frameworkUrl: "./Build/1.framework.js",
    codeUrl: "./Build/1.wasm",
  });*/

  const handleBet = () => {
    console.log("handleBet");

    /*unityContext.on("FinishedRace", (HorseName, time) => {
      console.log("FinishedRace", HorseName, time);
    });

    unityContext.send("GameController", "StartRace", 192301923123);*/
  }

  return (
    <div className="bg-white dark:bg-black h-full">
      <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-800">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="#" className="flex">
          <svg className="mr-3 h-10" viewBox="0 0 52 72" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.87695 53H28.7791C41.5357 53 51.877 42.7025 51.877 30H24.9748C12.2182 30 1.87695 40.2975 1.87695 53Z" fill="#76A9FA"/><path d="M0.000409561 32.1646L0.000409561 66.4111C12.8618 66.4111 23.2881 55.9849 23.2881 43.1235L23.2881 8.87689C10.9966 8.98066 1.39567 19.5573 0.000409561 32.1646Z" fill="#A4CAFE"/><path d="M50.877 5H23.9748C11.2182 5 0.876953 15.2975 0.876953 28H27.7791C40.5357 28 50.877 17.7025 50.877 5Z" fill="#1C64F2"/></svg>
            <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Hackathon</span>
        </a>
        <div className="flex md:order-2">
          { <ConnectButton
            Tezos={Tezos}
            setContract={setContract}
            setPublicToken={setPublicToken}
            setWallet={setWallet}
            setUserAddress={setUserAddress}
            setUserBalance={setUserBalance}
            setStorage={setStorage}
            contractAddress={contractAddress}
            setBeaconConnection={setBeaconConnection}
            wallet={wallet}
          /> }
        </div>
        <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <a href="#" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
            </li>
            <li>
              <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
            </li>
            <li>
              <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
            </li>
            <li>
              <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
            </li>
          </ul>
        </div>
        </div>
      </nav>

      <div className="container mx-auto">
        <div className="container-odd">
          <div className="grid grid-cols-12 gap-4">
            <div id="odd-card" className="col-span-2">
              <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl">
                <div className="px-2">
                  <h3 className="text-slate-900 dark:text-white mb-5 text-base font-medium tracking-tight">Odds</h3>
                  { horses.map((horse, index) => (
                    <p key={index} className="text-slate-500 dark:text-slate-400 mt-2">
                      { horse } - 1: 20
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div id="race-footage" className="col-start-3 col-span-8">
              <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl h-full">
                {/* <Unity unityContext={unityContext} /> */}
              </div>
            </div>
            <div id="race-state-card" className="col-start-11 col-span-2">
              <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl">
                <div className="px-6 text-center">
                  <h3 className="text-slate-900 dark:text-white mb-5 text-base font-medium tracking-tight">Race Starts in:</h3>
                  <p id="race-start-time"className="text-slate-500 dark:text-slate-400 mt-2"></p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 mt-4 pt-4">
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
            <div className="col-start-4 col-span-2">
              <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl">
                <h3 className="text-slate-900 dark:text-white mb-5 text-base font-medium tracking-tight">Bet Ticket</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Horse 1</p>
                <p className="text-slate-500 dark:text-slate-400 mt-2">To Win</p>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Bet Placed:</p>
                <p className="text-slate-500 dark:text-slate-400 mt-2">100 uUSD:</p>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Will Win:</p>
                <p className="text-slate-500 dark:text-slate-400 mt-2">200 uUSD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
