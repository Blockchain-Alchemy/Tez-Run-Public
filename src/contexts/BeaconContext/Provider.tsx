import React, { createContext, useState } from 'react'
import { ContractAbstraction, TezosToolkit, Wallet } from '@taquito/taquito';
import { BeaconWallet } from "@taquito/beacon-wallet";
import {
  BeaconEvent,
  defaultEventCallbacks
} from "@airgap/beacon-sdk";
import Network from "network";
import { BeaconContextApi } from './types'
import { useEffect } from 'react';

const Tezos = new TezosToolkit(Network.rpcUrl)
export const BeaconContext = createContext<BeaconContextApi>({} as BeaconContextApi)

export const BeaconProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState<BeaconWallet | undefined>(undefined);
  const [publicKey, setPublicKey] = useState<string>('');
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [connected, setConnected] = useState<boolean>(false);
  const [contract, setContract] = useState<ContractAbstraction<Wallet> | undefined>(undefined);

  useEffect(() => {
    if (!wallet)  {
      const wallet = new BeaconWallet({
        name: "Teo Run",
        preferredNetwork: Network.networkType,
        disableDefaultEvents: true, // Disable all events / UI. This also disables the pairing alert.
        eventHandlers: {
          // To keep the pairing alert, we have to add the following default event handlers back
          [BeaconEvent.PAIR_INIT]: {
            handler: defaultEventCallbacks.PAIR_INIT
          },
          [BeaconEvent.PAIR_SUCCESS]: {
            handler: data => setPublicKey(data.publicKey)
          }
        }
      });
      console.log("Tezos.setWalletProvider", wallet);
      Tezos.setWalletProvider(wallet);
      setWallet(wallet);
    }
  }, [wallet, setWallet, setPublicKey])

  const connectWallet = async (): Promise<void> => {
    try {
      if (!wallet) {
        return;
      }
      setLoading(true);

      await wallet.requestPermissions({
        network: {
          type: Network.networkType,
          rpcUrl: Network.rpcUrl,
        }
      });

      const address = await wallet.getPKH()
      console.log("userAddress", address)
      setAddress(address)

      const contract = await Tezos.wallet.at(Network.contractAddress)
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
    setPublicKey('');
    /*if (wallet) {
      await wallet.client.removeAllAccounts();
      await wallet.client.removeAllPeers();
      await wallet.client.destroy();
    }*/
  };

  return (
    <BeaconContext.Provider value={{
      Tezos,
      wallet,
      loading,
      connected,
      address,
      contract,
      connectWallet,
      disconnectWallet,
      setLoading,
    }}>
      {children}
    </BeaconContext.Provider>
  )
}
