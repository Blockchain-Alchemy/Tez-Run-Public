import axios from "axios";
import { uuid } from "uuidv4";
import { API_BASE_URL } from "configs";

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

export const readyRace = () => {
  const url = `${API_BASE_URL}/api/v1/tezrun/race/ready`;
  return axios.get(url).then((res) => {
    return res.data;
  });
};

export const startRace = () => {
  const url = `${API_BASE_URL}/api/v1/tezrun/race/start`;
  return axios.get(url).then((res) => {
    return res.data;
  });
};

export const finishRace = async (winner?: number | string) => {
  const winnerId = winner ? winner : "";
  const url = `${API_BASE_URL}/api/v1/tezrun/race/finish?winner=${winnerId}`;
  return axios.get(url).then((res) => {
    return res.data;
  });
};
