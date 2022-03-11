import { NetworkType } from "@airgap/beacon-sdk";

const Network = {
  networkType: NetworkType.HANGZHOUNET,
  rpcUrl: "https://hangzhounet.api.tez.ie",//"https://hangzhounet.smartpy.io",
  contractAddress: "KT18feYwzdedqF3pxv6RGNrnCjqbgkTjM1Y4", //"KT1PMZpsAPt3kYPshKmvrU4gve5vXpg1uNit", //"KT1J2UrLek8rXkWPAqR7KSBpRF4Bk13wgLAF",
  mainnetRpcList: [
    "https://mainnet.api.tez.ie",
    "https://mainnet.smartpy.io",
    "https://rpc.tzbeta.net",
    "https://teznode.letzbake.com",
  ],
  hangzhounetRpcList: [
    "https://hangzhounet.api.tez.ie",
    "https://hangzhounet.smartpy.io",
    "https://testnet-tezos.giganode.io"
  ]
}

export default Network;