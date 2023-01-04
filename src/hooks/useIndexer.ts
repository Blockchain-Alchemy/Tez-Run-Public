import { useCallback } from "react";
import axios from "axios";
import { useNetwork } from "../contexts/NetworkProvider";

export const useIndexer = () => {
  const { config } = useNetwork();

  const getBalance = useCallback(async () => {
    const url = `${config.Indexer}/explorer/account/${config.TezRun}`;
    return axios.get(url).then((res) => {
      return Number(res.data.spendable_balance) * 1000000;
    });
  }, [config]);

  const getBigmapValues = useCallback(
    (id: string) => {
      const url = `${config.Indexer}/explorer/bigmap/${id}/values`;
      return axios.get(url).then((res) => {
        return res.data;
      });
    },
    [config]
  );

  const getStorage = useCallback(() => {
    const url = `${config.Indexer}/explorer/contract/${config.TezRun}/storage`;
    return axios.get(url).then((res) => {
      return res.data;
    });
  }, [config]);

  const getRaceState = useCallback(() => {
    return getStorage().then((storage) => storage.value.status);
  }, [getStorage]);

  const getTickets = useCallback(
    (address: string) => {
      return getStorage().then((storage) => storage.value.tickets);
    },
    [getStorage]
  );

  const getGameState = useCallback(() => {
    return getStorage().then((storage) => {
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
  }, [getStorage]);

  const getRewards = useCallback(
    (address: string) => {
      return getStorage()
        .then((storage) => {
          const id = storage.value.rewards;
          return getBigmapValues(id);
        })
        .then((rewards: any[]) => {
          if (!rewards) {
            return 0;
          }
          return rewards
            .filter((i) => i.key === address && i.value["0"])
            .reduce((prev, item) => prev + Number(item.value[0]), 0);
        });
    },
    [getStorage, getBigmapValues]
  );

  return {
    getBalance,
    getRaceState,
    getTickets,
    getGameState,
    getRewards,
  };
};
