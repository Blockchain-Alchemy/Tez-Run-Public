import axios from "axios";
import { uuid } from 'uuidv4';
import { API_BASE_URL } from "config";

export const updateBetting = (raceId, horseId, payout, amount) => {
  const url = `${API_BASE_URL}/api/bet`;
  const payload = {
    uniqueId: uuid(),
    raceId,
    horseId,
    amount,
    payout,
  };
  return axios.post(url, payload).then((res) => {
    return res.data;
  });
};

export const getRaceState = () => {
  const url = `${API_BASE_URL}/api/v1/tezrun/race/status`;
  return axios.get(url).then((res) => {
    return res.data;
  });
}

export const getTickets = (address: string) => {
  const url = `${API_BASE_URL}/api/v1/tezrun/race/tickets/${address}`;
  return axios.get(url).then((res) => {
    return res.data;
  });
}

export const finishRace = () => {
  const url = `${API_BASE_URL}/api/v1/tezrun/race/finish`;
  return axios.get(url).then((res) => {
    return res.data;
  });
}