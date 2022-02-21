import { DAppClientOptions, RequestPermissionInput, NetworkType } from '@airgap/beacon-sdk';
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
//import { TempleWallet } from "@temple-wallet/dapp";
import $ from "jquery";

export class App {
  private tezos: TezosToolkit | undefined;

  private loading: boolean = false;

  constructor() {
    this.tezos = new TezosToolkit("https://mainnet.api.tez.ie");
    //this.tk = new TezosToolkit('https://hangzhounet.api.tez.ie');
  }

  public async initUI() {
    $("#sync-button").bind("click", () => {
      this.initWallet(); //this.syncWallet();
    })
    $("#show-balance-button").bind("click", () =>
      this.getBalance($("#address-input").val())
    );
  }

  private async initWallet() {
    try {
      const options = {
        name: 'MyAwesomeDapp',
        iconUrl: 'https://tezostaquito.io/img/favicon.png',
        preferredNetwork: NetworkType.MAINNET,
        eventHandlers: {
          PERMISSION_REQUEST_SUCCESS: {
            handler: async (data) => {
              console.log('permission data:', data);
            },
          },
        },
      };
      const wallet = new BeaconWallet(options);
      console.log("wallet", wallet);

      await wallet.requestPermissions({
        network: {
          type: NetworkType.MAINNET,
        },
      });

      console.log("permsion-ok");

      const userAddress = await wallet.getPKH();
      console.log("userAddress", userAddress);
      
      this.tezos?.setWalletProvider(wallet);

    } catch (error) {
      console.log(error);
    }
  }
  
  private async syncWallet() {
    /*try {
      if (!this.tezos) {
        const available = await TempleWallet.isAvailable();
        if (!available) {
          throw new Error("Temple Wallet not installed");
        }
        console.log("available", available)

        const wallet = new TempleWallet("My Super DApp");
        await wallet.connect("mainnet");
        this.tezos = wallet.toTezos();

        const accountPkh = await this.tezos.wallet.pkh();
        const accountBalance = await this.tezos.tz.getBalance(accountPkh);
        console.log(`address: ${accountPkh}, balance: ${accountBalance}`);

        $("#address-input").val(accountPkh);
        $("#balance").html(`${accountBalance}`);

        $("#sync-button").html('Unsync');
      }
      else {
        this.tezos = undefined;
        $("#sync-button").html('Sync Wallet');
        $("#address-input").val('');
        $("#balance").html('');
      }

    } catch (err) {
      console.error('error:', err);
    }*/
  }

  private async getBalance(address: string) {
    try {
      if (!this.tezos) {
        return;
      }

      if (this.loading) {
        return;
      }
      this.loading = true;
      $("#balance-token").html('Loading...');

      const contract = await this.tezos.wallet.at("KT1N11kC9LuDnhAWV4r7fr3dFfDUB3HXwkix");
      console.log("contract", contract)

      const storage: any = await contract.storage();
      console.log("storage", storage)

      const tokenId = '2';
      const value = await storage.ledger.get({
        0: address,
        1: tokenId
      });
      console.log("value", value);
      if (value) {
        $("#balance-token").html('Has Token')
      }
      else {
        $("#balance-token").html('Does not have Token')
      }

    } catch (err) {
      $("#balance-token").html('')
      console.error('error:', err);
    }

    this.loading = false;
  }
}
