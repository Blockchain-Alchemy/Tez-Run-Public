import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";

export interface BeaconContextApi {
  tezos: TezosToolkit
  wallet: BeaconWallet | undefined
  connected: boolean
  publicKey: string
  userAddress: string
  setUserAddress: (address: string) => void
  setConnected: (connected: boolean) => void
}
