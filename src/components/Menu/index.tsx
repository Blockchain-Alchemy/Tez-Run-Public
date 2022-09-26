import React, { useState } from 'react';
import { NetworkType } from "@airgap/beacon-sdk";
import ConnectButton from 'components/ConnectWallet';
import Switch from 'components/Switch'
import { Mainnet, Testnet } from 'config'
import useBeacon from 'hooks/useBeacon';

const Menu = ({ children }): JSX.Element => {
  const [testNet, setTestNet] = useState(true);
  const [rpcList, setRpcList] = useState(Testnet.RpcList);
  const {rpcUrl, setRpcUrl, setNetworkType} = useBeacon();
  
  const changeNetwork = (isTestnet) => {
    console.log("handleChangeNet", isTestnet)

    setTestNet(isTestnet);
    setNetworkType(isTestnet ? Testnet.NetworkType : Mainnet.NetworkType);

    const rpcs = getRpcList(isTestnet);
    setRpcList(rpcs);

    setRpcUrl(rpcs[0]);
  }

  const getRpcList = (isTestnet) => {
    return isTestnet ? Testnet.RpcList : Mainnet.RpcList; 
  }

  return (
    <div className="bg-white dark:bg-black h-full">
      <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-800">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="/" className="flex">
          <svg className="mr-3 h-10" viewBox="0 0 52 72" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.87695 53H28.7791C41.5357 53 51.877 42.7025 51.877 30H24.9748C12.2182 30 1.87695 40.2975 1.87695 53Z" fill="#76A9FA"/><path d="M0.000409561 32.1646L0.000409561 66.4111C12.8618 66.4111 23.2881 55.9849 23.2881 43.1235L23.2881 8.87689C10.9966 8.98066 1.39567 19.5573 0.000409561 32.1646Z" fill="#A4CAFE"/><path d="M50.877 5H23.9748C11.2182 5 0.876953 15.2975 0.876953 28H27.7791C40.5357 28 50.877 17.7025 50.877 5Z" fill="#1C64F2"/></svg>
            <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">TezRun</span>
        </a>
        <div className="flex md:order-2 items-center">
          <div className="mr-6">
            <Switch
              toggle={testNet}
              setToggle={e => changeNetwork(e)}
              labelOff="MainNet"
              labelOn="TestNet"            
            ></Switch>
          </div>
          <div className="mr-6">
            <select
              className="form-select block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Default select example"
              defaultValue={rpcUrl}
              onChange={e => setRpcUrl(e.target.value)}
            >
              {rpcList.map((rpc, index) => (
                <option key={index} value={rpc}>
                  {rpc}
                </option>
              ))}
            </select>
          </div>
          <ConnectButton></ConnectButton>
        </div>
        <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <a href="/home" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
            </li>
            <li>
              <a href="/about" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
            </li>
            <li>
              <a href="/services" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
            </li>
            <li>
              <a href="/contact" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
            </li>
          </ul>
        </div>
        </div>
      </nav>
      { children }
    </div>
  )
}

export default Menu;
