import axios from "axios";
import { uuid } from "uuidv4";
import { API_BASE_URL, Mainnet } from "configs";

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
export const getBalance = (indexer: string, address: string) => {
  const url = `${indexer}/explorer/account/${address}`;
  return axios.get(url).then((res) => {
    return Number(res.data.spendable_balance) * 1000000;
  });
};

export const getStorage = (indexer: string) => {
  const url = `${indexer}/explorer/contract/${Mainnet.TezRun}/storage`;
  return axios.get(url).then((res) => {
    return res.data;
  });
};

export const getBigmapValues = (indexer: string, id: string) => {
  const url = `${indexer}/explorer/bigmap/${id}/values`;
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

export const getGameState = (indexer: string) => {
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
  return getStorage(indexer)
    .then((storage) => {
      const id = storage.value.rewards;
      return getBigmapValues(indexer, id);
    })
    .then((rewards: any[]) => {
      if (!rewards) {
        return 0;
      }
      return rewards
        .filter((i) => i.key === address && i.value["0"])
        .reduce((prev, item) => prev + Number(item.value[0]), 0);
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
