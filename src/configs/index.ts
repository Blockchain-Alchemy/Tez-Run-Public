import { NetworkType } from "@airgap/beacon-sdk";

export const BaseUrl = process.env.REACT_APP_API_URL || "https://grat.fun";

export const Admin = "tz1bxwduvRwBhq59FmThGKD5ceDFadr57JTq";

export const API_BASE_URL = "https://grat.fun";

export type NetworkConfig = {
  RpcUrl: string;
  Indexer: string;
  TezRun: string;
  HorseContract: string;
  Escrow: string;
  UUSD: string;
};

type ConfigMap = {
  [key in NetworkType]?: NetworkConfig;
};

export const Networks: ConfigMap = {
  [NetworkType.MAINNET]: {
    RpcUrl: "https://mainnet.api.tez.ie",
    Indexer: "https://api.tzstats.com",
    TezRun: "KT1Pn2u8gd9k5v37md7gKLbPxy9DwPzc2T4i",//"KT1SabQEuqzxrwp6caZyXPXpt98FhHoPB5NZ",
    HorseContract: "KT18xwoxrafyQKAgRs4XfqT189BWcsic5eG3",
    Escrow: "KT1R2Uo6Q3o4emoPekgbEPs2eQMpqXfravSC",
    UUSD: "KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW",
  },
  [NetworkType.JAKARTANET]: {
    RpcUrl: "https://jakartanet.tezos.marigold.dev",
    Indexer: "https://api.jakarta.tzstats.com",
    TezRun: "KT1QqTCsHghND8gfeG55w2pWCskZpFFgjVCV",
    HorseContract: "",
    Escrow: "",
    UUSD: "",
  },
};

export const ShowCheatMenu = true;
