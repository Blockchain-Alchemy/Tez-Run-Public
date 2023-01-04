import { useCallback, useState } from "react";
import { useNetwork } from "../contexts/NetworkProvider";
import { useWallet } from "../contexts/WalletProvider";

export const useTezrun = () => {
  const { config } = useNetwork();
  const { tezos, address } = useWallet();
  const [approval, setApproval] = useState(false);

  const getContract = useCallback(() => {
    return tezos.wallet.at(config.TezRun);
  }, [tezos, config]);

  const getApproval = async () => {
    if (approval) {
      return new Promise((resolve) => resolve(approval));
    }
    try {
      const contract = await tezos.wallet.at(config.UUSD);
      const storage: any = await contract.storage();

      const key = {
        owner: address,
        operator: config.TezRun,
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
      const contract = await tezos.wallet.at(config.UUSD);
      const params = [
        {
          add_operator: {
            owner: address,
            operator: config.TezRun,
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
      //return op.confirmation();
      return op;
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
