import { NetworkType } from "@airgap/beacon-sdk";

export const API_BASE_URL = "https://grat.fun";

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
  TezRun: "KT1L1oiTbHTPjr2sGjNeeUqmKWM1DVmziKfo",//"KT1VyEv4iEqYyDAdNT1MBC9TqRpwHba6ygAB",
  uUSD: "KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW",
};

export const Testnet = {
  NetworkType: NetworkType.JAKARTANET,
  RpcUrl: "https://jakartanet.tezos.marigold.dev",
  RpcList: [
    "https://jakartanet.tezos.marigold.dev"
  ],
  TezRun: "KT1QqTCsHghND8gfeG55w2pWCskZpFFgjVCV",//"KT1DPVoEvys2XrRRiZzNQw7uBuQvb8Dmk1yo",//"KT1KLyMmk1NG9KhyDmU8TTvebcLTXw16ykuE",
  uUSD: "KT1Xf83TTyDDxYxr1x2jKFjHXcCsD4RSnaE5",
};