import { useCallback, useState } from "react";
import { useNetwork } from "../contexts/NetworkProvider";
import { useWallet } from "../contexts/WalletProvider";

export const useHorseCollection = () => {
  const { config } = useNetwork();
  const { tezos, address } = useWallet();
  const [approval, setApproval] = useState(false);

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

  const mintToken = useCallback(
    async (tokenId) => {
      const params: any = [
        {
          owner: address,
          token_id: tokenId,
          amount: 1,
        },
      ];
      const contract = await tezos.wallet.at(config.HorseCollection);
      const op = await contract.methods.mint_tokens(params).send();
      return await op.confirmation();
    },
    [tezos, config, address]
  );

  return {
    mintToken,
    getApproval,
    approve,
  };
};
