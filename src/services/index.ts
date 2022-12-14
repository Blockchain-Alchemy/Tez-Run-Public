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

// Indexer
export const getStorage = (indexer: string) => {
  const url = `${indexer}/explorer/contract/KT1TK9GheViS3Z8hJSjZnBo7324rXnFtnYGC/storage`;
  return axios.get(url).then((res) => {
    return res.data;
  });
};

export const getRaceState = (indexer: string) => {
  // const url = `${API_BASE_URL}/api/v1/tezrun/race/status`;
  // return axios.get(url).then((res) => {
  //   return res.data;
  // });
  return getStorage(indexer).then((storage) => storage.value.status);
};

export const getTickets = (indexer: string, address: string) => {
  // const url = `${API_BASE_URL}/api/v1/tezrun/race/tickets/${address}`;
  // return axios.get(url).then((res) => {
  //   return res.data;
  // });
  return getStorage(indexer).then((storage) => storage.value.tickets);
};

export const getGameState = (indexer: string, address: string) => {
  // const url = `${API_BASE_URL}/api/v1/tezrun/status/${address}`;
  // return axios.get(url).then((res) => {
  //   return res.data;
  // });
  return getStorage(indexer).then((storage) => {
    const value = storage.value;
    return {
      race: {
        admin: value.admin,
        paused: value.paused,
        race_id: value.race_id,
        start_time: value.start_time,
        status: value.status,
        winner: value.winner,
      },
      tickets: value.tickets,
    };
  });
};

export const getRewards = (indexer: string, address: string) => {
  // const url = `${API_BASE_URL}/api/v1/tezrun/rewards/${address}`;
  // return axios.get(url).then((res) => {
  //   return res.data;
  // });
  return getStorage(indexer).then((storage) => storage.value.rewards);
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

export const finishRace = () => {
  const url = `${API_BASE_URL}/api/v1/tezrun/race/finish`;
  return axios.get(url).then((res) => {
    return res.data;
  });
};
