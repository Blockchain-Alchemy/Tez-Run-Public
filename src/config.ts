import { NetworkType } from "@airgap/beacon-sdk";

export const API_BASE_URL = "http://localhost:8080";

export const RaceState = {
  None: 0,
  Ready: 1,
  Started: 2,
  Finished: 3,
};

export const Admin = "tz1bxwduvRwBhq59FmThGKD5ceDFadr57JTq";

export const Mainnet = {
  NetworkType: NetworkType.MAINNET,
  RpcUrl: "https://mainnet.api.tez.ie",
  RpcList: [
    "https://mainnet.api.tez.ie",
    "https://mainnet.smartpy.io",
    "https://rpc.tzbeta.net",
    "https://teznode.letzbake.com",
  ],
  TezRun: "KT1VyEv4iEqYyDAdNT1MBC9TqRpwHba6ygAB",
  uUSD: "KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW",
};

export const Testnet = {
  NetworkType: NetworkType.JAKARTANET,
  RpcUrl: "https://jakartanet.tezos.marigold.dev",
  RpcList: [
    "https://jakartanet.tezos.marigold.dev"
  ],
  TezRun: "KT1AcQzXJatfthjW6KqyCrQ46KCPMqA7GQvm", //"KT1RkJcLoyLEfvt58dCDswae18naGBXo3XqK",
  uUSD: "KT1Xf83TTyDDxYxr1x2jKFjHXcCsD4RSnaE5",
};