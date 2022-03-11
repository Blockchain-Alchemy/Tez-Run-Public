import React, { createContext, useState } from 'react'
import { ContractAbstraction, TezosToolkit, Wallet } from '@taquito/taquito';
import { BeaconWallet } from "@taquito/beacon-wallet";
import {
  NetworkType,
  BeaconEvent,
  defaultEventCallbacks
} from "@airgap/beacon-sdk";
import Network from "network";
import { BeaconContextApi } from './types'
import { useEffect } from 'react';

export const BeaconContext = createContext<BeaconContextApi>({} as BeaconContextApi)

export const BeaconProvider: React.FC = ({ children }) => {
  const [tezos, setTezos] = useState<TezosToolkit | undefined>(undefined)
  const [networkType, setNetworkType] = useState<NetworkType>(Network.networkType)
  const [rpcUrl, setRpcUrl] = useState(Network.rpcUrl);

  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState<BeaconWallet | undefined>(undefined);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [connected, setConnected] = useState<boolean>(false);
  const [contract, setContract] = useState<ContractAbstraction<Wallet> | undefined>(undefined);

  useEffect(() => {
    console.log("create toolkit")
    setWallet(undefined);
    setAddress(undefined);
    setConnected(false);
    setContract(undefined);
    setTezos(new TezosToolkit(rpcUrl));
  }, [rpcUrl, setTezos])

  useEffect(() => {
    if (!wallet)  {
      console.log("create wallet")
      const wallet = new BeaconWallet({
        name: "Teo Run",
        preferredNetwork: networkType,
        disableDefaultEvents: true, // Disable all events / UI. This also disables the pairing alert.
        eventHandlers: {
          // To keep the pairing alert, we have to add the following default event handlers back
          [BeaconEvent.PAIR_INIT]: {
            handler: defaultEventCallbacks.PAIR_INIT
          },
          [BeaconEvent.PAIR_SUCCESS]: {
            handler: data => console.log(data.publicKey)
          }
        }
      });
      console.log("Tezos.setWalletProvider", wallet);
      tezos?.setWalletProvider(wallet);
      setWallet(wallet);
    }
  }, [wallet, setWallet, tezos, networkType])

  const connectWallet = async (): Promise<void> => {
    try {
      if (!wallet || !tezos) {
        return;
      }
      setLoading(true);

      await wallet.requestPermissions({
        network: {
          type: networkType,
          rpcUrl: rpcUrl,
        }
      });

      const address = await wallet.getPKH()
      console.log("userAddress", address)
      setAddress(address)

      const contract = await tezos.wallet.at(Network.contractAddress)
      console.log("contract", contract);
      setContract(contract);
      
      setConnected(true);
    }
    catch (error) {
      console.log(error);
      setConnected(false);
    }
    finally {
      setLoading(false);
    }
  };

  const disconnectWallet = async (): Promise<void> => {
    setConnected(false);
    /*if (wallet) {
      await wallet.client.removeAllAccounts();
      await wallet.client.removeAllPeers();
      await wallet.client.destroy();
    }*/
  };

  return (
    <BeaconContext.Provider value={{
      tezos,
      wallet,
      loading,
      connected,
      address,
      contract,
      rpcUrl,
      connectWallet,
      disconnectWallet,
      setLoading,
      setNetworkType,
      setRpcUrl,
    }}>
      {children}
    </BeaconContext.Provider>
  )
}
