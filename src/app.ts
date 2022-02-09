import { TezosToolkit } from "@taquito/taquito";
import { TempleWallet } from "@temple-wallet/dapp";
import $ from "jquery";

export class App {
  private tezos: TezosToolkit | undefined;

  private loading: boolean = false;

  constructor() {
    //this.tk = new TezosToolkit("https://api.tez.ie/rpc/mainnet");
    //this.tk = new TezosToolkit('https://hangzhounet.api.tez.ie');
  }

  public async initUI() {
    $("#sync-button").bind("click", () => {
      this.syncWallet();
    })
    $("#show-balance-button").bind("click", () =>
      this.getBalance($("#address-input").val())
    );
  }
  
  private async syncWallet() {
    try {
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
    }
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
