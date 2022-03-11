import { ContractAbstraction, TezosToolkit, Wallet } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";

export interface BeaconContextApi {
  Tezos: TezosToolkit
  wallet: BeaconWallet | undefined
  loading: boolean
  connected: boolean
  address: string | undefined
  contract: ContractAbstraction<Wallet> | undefined
  connectWallet: () => Promise<void>
  disconnectWallet: () => Promise<void>
  setLoading: (loading: boolean) => void
}
