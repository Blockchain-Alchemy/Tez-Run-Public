import axios from 'axios';
import { Mainnet, BaseUrl } from 'configs';

const TZSTATS_URL = 'https://api.tzstats.com';

export const getEscrowBalance = () => {
  const url = `${TZSTATS_URL}/explorer/account/${Mainnet.Escrow}`;
  return axios.get(url)
    .then((res: any) => {
      return res.data.spendable_balance;
    })
    .catch(e => console.error(e));
}

export const takeRewards = (address: string) => {
  const url = `${BaseUrl}/api/escrow/reward/${address}`;
  return axios.get(url)
    .then((res: any) => {
      return res.data.data;
    })
    .catch(e => console.error(e));
}