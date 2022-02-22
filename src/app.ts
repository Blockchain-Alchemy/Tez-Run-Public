import { NetworkType } from '@airgap/beacon-sdk';
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import $ from "jquery";
const moment = require('moment');

export class App {
  private tezos: TezosToolkit | undefined;
  private loading: boolean = false;

  private timer: any;
  private horses: any[] = [];
  private raceState: 'waiting' | 'playing' | 'finished' = 'waiting';

  constructor() {
    this.tezos = new TezosToolkit("https://mainnet.api.tez.ie");
    //this.tk = new TezosToolkit('https://hangzhounet.api.tez.ie');
    this.timer = moment();
  }

  public async initUI() {
    $("#connect-wallet-button").bind("click", () => {
      this.initWallet(); //this.syncWallet();
    })
    /*$("#show-balance-button").bind("click", () =>
      this.getBalance($("#address-input").val())
    );*/

    setInterval(() => {
      this.timer.add(-1, 's')
      $("#race-start-time").html(this.timer.format("hh:mm:ss"));
    }, 1000)

    setInterval(() => {
      this.updateRaceState();
    }, 5000)

    this.getHorseList();
  }

  private async initWallet() {
    try {
      const options = {
        name: 'MyAwesomeDapp',
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

      await wallet.requestPermissions({
        network: {
          type: NetworkType.MAINNET,
        },
      });

      this.tezos?.setWalletProvider(wallet);

      const userAddress = await wallet.getPKH();
      console.log("Address", userAddress);

      const accountBalance = await this.tezos?.tz.getBalance(userAddress);
      console.log(`Bbalance: ${accountBalance}`);

      $("#address-input").val(userAddress);
      $("#balance").html(`${accountBalance}`);

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

  private async getHorseList() {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('foo');
      }, 1000);
    })
    .then(() => {
      this.horses = [1,2,3,4,5,6].map(index => {
        return {
          id: index,
          name: `Horse ${index}`,
          win: index,
          loss: 1,
        }
      })
      this.initHorseList();
    });
  }

  private initHorseList() {
    const firstLabel = $("#horse-list").children().first();
    const firstOption = $("#select-horse").children().first();

    this.horses.forEach(horse => {
      const ptag = firstLabel.clone().removeClass('hidden');
      ptag.html(`${horse.name} - ${horse.win}:${horse.loss}`);
      $("#horse-list").append(ptag);

      const option = firstOption.clone().removeAttr('selected').removeAttr('disabled');
      option.val(horse.id);
      option.html(horse.name);
      $("#select-horse").append(option);
    })
  }

  private updateRaceState() {
    this.raceState = 'playing';

    console.log("updateRaceState", this.raceState);
    if (this.raceState === 'playing') {
      $("#odd-card").hide();
      $("#race-state-card").hide();
      $("#place-bet-card").hide();
    }
  }
}
