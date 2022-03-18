import { NetworkType } from "@airgap/beacon-sdk";

export const RaceState = {
  None: 0,
  Ready: 1,
  Started: 2,
  Finished: 3
}

const Network = {
  networkType: NetworkType.HANGZHOUNET,

  rpcUrl: "https://hangzhounet.smartpy.io",//"https://hangzhounet.api.tez.ie",

  mainnetRpcList: [
    "https://mainnet.api.tez.ie",
    "https://mainnet.smartpy.io",
    "https://rpc.tzbeta.net",
    "https://teznode.letzbake.com",
  ],

  hangzhounetRpcList: [
    "https://hangzhounet.smartpy.io",
    "https://hangzhounet.api.tez.ie",
    "https://testnet-tezos.giganode.io"
  ],

  contractAddress: "KT1X1vmBrGb4YHNSDPzYX5QGmNDkTrfeQmH1",
    //"KT1BsUwGoXZ16m3ssHgR8tKmcJdpYVk2ypvS",
    //"KT1AqeeD6fWCqq6gBnCJXqDRnMZtQSto1JUM",
    //"KT1VStRf2D1hDyWru4mkVdnBjo3VNsW64AQn",
    //"KT18feYwzdedqF3pxv6RGNrnCjqbgkTjM1Y4",
    //"KT18feYwzdedqF3pxv6RGNrnCjqbgkTjM1Y4", //"KT1PMZpsAPt3kYPshKmvrU4gve5vXpg1uNit", //"KT1J2UrLek8rXkWPAqR7KSBpRF4Bk13wgLAF",

  uUSD: "KT1QEzbqE3pdb1G7TzV3P7gs1A8YtMvdNLWU", //"KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW"

  tokenId: 1,
}

export default Network;