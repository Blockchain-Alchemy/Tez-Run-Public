import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";

export interface BeaconContextApi {
  Tezos: TezosToolkit
  wallet: BeaconWallet | undefined
  connected: boolean
  publicKey: string
  setConnected: (connected: boolean) => void
}
