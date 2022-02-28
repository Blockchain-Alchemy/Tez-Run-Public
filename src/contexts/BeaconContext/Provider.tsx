import React, { createContext, useState } from 'react'
import { TezosToolkit } from '@taquito/taquito';
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
  const [wallet, setWallet] = useState<BeaconWallet | undefined>(undefined);
  const [publicKey, setPublicKey] = useState<string>('');
  const [connected, setConnected] = useState<boolean>(false);

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

  return (
    <BeaconContext.Provider value={{ Tezos, wallet, publicKey, connected, setConnected }}>
      {children}
    </BeaconContext.Provider>
  )
}
