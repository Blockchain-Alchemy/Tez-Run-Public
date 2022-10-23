import { useCallback, useState, useMemo } from "react";
import { Testnet, Mainnet } from "config";
import useBeacon from "./useBeacon";

const useTezrun = () => {
  const { tezos, contract, address, networkType, setLoading } = useBeacon();
  const [approval, setApproval] = useState(false);

  const getStorage = useCallback(() => {
    return contract?.storage();
  }, [contract]);

  const uUSDContractAddress = useMemo(() => {
    return networkType === Testnet.NetworkType ? Testnet.uUSD : Mainnet.uUSD;
  }, [networkType]);

  const gameContractAddress = useMemo(() => {
    return networkType === Testnet.NetworkType
      ? Testnet.TezRun
      : Mainnet.TezRun;
  }, [networkType]);

  const getApproval = async () => {
    if (approval) {
      return new Promise((resolve) => resolve(approval));
    }
    try {
      setLoading(true);
      const contract = await tezos.wallet.at(uUSDContractAddress);
      const storage: any = await contract.storage();

      const key = {
        owner: address,
        operator: gameContractAddress,
        token_id: 0,
      };
      const operators = await storage.operators.get(key);
      if (operators) {
        setApproval(true);
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const approve = async () => {
    try {
      setLoading(true);
      const contract = await tezos.wallet.at(uUSDContractAddress);
      const params = [
        {
          add_operator: {
            owner: address,
            operator: gameContractAddress,
            token_id: 0,
          },
        },
      ];
      const op = await contract.methods.update_operators(params).send();
      return op.confirmation(2);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const placeBet = useCallback(
    async (horseId, payout, tezosAmount, tokenId = 0, tokenAmount = 0) => {
      if (contract) {
        try {
          setLoading(true);
          const op = await contract.methods
            .place_bet(tokenAmount, horseId, payout, tokenId)
            .send({
              amount: tezosAmount,
            });
          return op.confirmation();
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
    },
    [contract]
  );

  const placeBetByToken = useCallback(
    async (raceId, horseId, payout, amount) => {
      if (contract) {
        try {
          setLoading(true);
          const op = await contract.methods
            .place_bet(amount, horseId, payout, raceId, 1)
            .send();
          return op.confirmation();
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
    },
    [contract]
  );

  const takeReward = useCallback(async () => {
    if (contract) {
      try {
        setLoading(true);
        const op = await contract.methods.take_rewards().send();
        return op.confirmation(2);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  }, [contract]);

  return {
    placeBet,
    placeBetByToken,
    takeReward,
    getApproval,
    approve,
    getStorage,
  };
};

export default useTezrun;
