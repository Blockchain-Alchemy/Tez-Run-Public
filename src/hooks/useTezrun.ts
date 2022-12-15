import { useCallback, useState, useMemo } from "react";
import { Testnet, Mainnet } from "configs";
import useBeacon from "./useBeacon";

const useTezrun = () => {
  const { tezos, address, networkType } = useBeacon();
  const [approval, setApproval] = useState(false);

  const getContract = useCallback(() => {
    const contractAddress =
      networkType === Testnet.NetworkType ? Testnet.TezRun : Mainnet.TezRun;
    return tezos.wallet.at(contractAddress);
  }, [tezos, networkType]);

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
    }
  };

  const approve = async () => {
    try {
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
      return op.confirmation();
    } catch (e) {
      console.error(e);
    }
  };

  const placeBet = useCallback(
    async (horseId, payout, tezosAmount, tokenId = 0, tokenAmount = 0) => {
      const contract = await getContract();
      const op = await contract.methods
        .place_bet(tokenAmount, horseId, payout, tokenId)
        .send({
          amount: tezosAmount,
        });
      return op.confirmation();
    },
    [getContract]
  );

  const placeBetByToken = useCallback(
    async (raceId, horseId, payout, amount) => {
      const contract = await getContract();
      const op = await contract.methods
        .place_bet(amount, horseId, payout, raceId, 1)
        .send();
      return op.confirmation();
    },
    [getContract]
  );

  const takeReward = useCallback(async () => {
    const contract = await getContract();
    const op = await contract.methods.take_rewards().send();
    return op.confirmation();
  }, [getContract]);

  return {
    placeBet,
    placeBetByToken,
    takeReward,
    getApproval,
    approve,
  };
};

export default useTezrun;
