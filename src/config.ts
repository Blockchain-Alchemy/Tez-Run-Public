import { NetworkType } from "@airgap/beacon-sdk";

export const RaceState = {
  None: 0,
  Ready: 1,
  Started: 2,
  Finished: 3
}

const Network = {
  networkType: NetworkType.JAKARTANET,

  rpcUrl: "https://jakartanet.tezos.marigold.dev",

  mainnetRpcList: [
    "https://mainnet.api.tez.ie",
    "https://mainnet.smartpy.io",
    "https://rpc.tzbeta.net",
    "https://teznode.letzbake.com",
  ],

  hangzhounetRpcList: [
    "https://jakartanet.tezos.marigold.dev",
  ],

  contractAddress: "KT1RkJcLoyLEfvt58dCDswae18naGBXo3XqK",

  uUSD: "KT1Xf83TTyDDxYxr1x2jKFjHXcCsD4RSnaE5",

  tokenId: 1,
}

export default Network;