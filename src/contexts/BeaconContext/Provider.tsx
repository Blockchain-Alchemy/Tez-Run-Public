import React, { createContext, useState, useCallback } from "react";
import { ContractAbstraction, TezosToolkit, Wallet } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { PermissionScope } from "@airgap/beacon-sdk";
import { BeaconEvent, defaultEventCallbacks } from "@airgap/beacon-sdk";
import { Testnet, Mainnet } from "config";
import { BeaconContextApi } from "./types";
import { useEffect } from "react";

export const BeaconContext = createContext<BeaconContextApi>(
  {} as BeaconContextApi
);

const scopes: PermissionScope[] = [
  PermissionScope.OPERATION_REQUEST,
  PermissionScope.SIGN,
];

type WalletType = ContractAbstraction<Wallet> | undefined;

export const BeaconProvider: React.FC = ({ children }) => {
  const [tezos, setTezos] = useState<TezosToolkit>(new TezosToolkit(Mainnet.RpcUrl));
  const [networkType, setNetworkType] = useState(Mainnet.NetworkType);
  const [rpcUrl, setRpcUrl] = useState(Mainnet.RpcUrl);
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState<BeaconWallet | undefined>(undefined);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [connected, setConnected] = useState<boolean>(false);
  const [contract, setContract] = useState<WalletType>(undefined);

  useEffect(() => {
    setAddress(undefined);
    setConnected(false);
    setContract(undefined);
    setTezos(new TezosToolkit(rpcUrl));
  }, [rpcUrl, setTezos]);

  useEffect(() => {
    const createWallet = async () => {
      if (wallet) {
        await wallet.client.destroy();
        await wallet.disconnect();
      }

      const _wallet = new BeaconWallet({
        name: "Teo Run",
        preferredNetwork: networkType,
        disableDefaultEvents: true, // Disable all events / UI. This also disables the pairing alert.
        eventHandlers: {
          // To keep the pairing alert, we have to add the following default event handlers back
          [BeaconEvent.PAIR_INIT]: {
            handler: defaultEventCallbacks.PAIR_INIT,
          },
          [BeaconEvent.PAIR_SUCCESS]: {
            handler: (data) => console.log(data.publicKey),
          },
        },
      });

      tezos.setWalletProvider(_wallet);
      setWallet(_wallet);
    };
    createWallet();
  }, [tezos]);

  useEffect(() => {
    const getContracts = async () => {
      const contractAddress =
        networkType === Testnet.NetworkType ? Testnet.TezRun : Mainnet.TezRun;
      console.log("contractAddress", contractAddress);
      const contract = await tezos.wallet.at(contractAddress);
      console.log("TezRun Contract", contract);
      setContract(contract);
    };
    connected && getContracts();
  }, [tezos, connected]);

  const connectWallet = useCallback(() => {
    const connect = async () => {
      if (wallet) {
        try {
          setLoading(true);

          console.log("Request Permission", networkType, rpcUrl);
          await wallet.client.requestPermissions({
            network: {
              type: networkType,
              rpcUrl: rpcUrl,
            },
            scopes,
          });

          const address = await wallet.getPKH();
          console.log("userAddress", address);
          setAddress(address);

          setConnected(true);
        } catch (error) {
          console.error(error);
          setConnected(false);
        } finally {
          setLoading(false);
        }
      }
    };
    connect();
  }, [tezos, wallet, networkType, rpcUrl]);

  const disconnectWallet = async (): Promise<void> => {
    setConnected(false);
    if (wallet) {
      //await wallet.client.removeAllAccounts();
      //await wallet.client.removeAllPeers();
      await wallet.client.destroy();
      await wallet.disconnect();
    }
  };

  return (
    <BeaconContext.Provider
      value={{
        tezos,
        wallet,
        loading,
        connected,
        address,
        contract,
        rpcUrl,
        networkType,
        connectWallet,
        disconnectWallet,
        setLoading,
        setNetworkType,
        setRpcUrl,
      }}
    >
      {children}
    </BeaconContext.Provider>
  );
};
