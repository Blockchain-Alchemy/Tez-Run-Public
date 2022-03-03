import { useCallback, useEffect, useState } from "react";
import { ContractAbstraction, Wallet } from "@taquito/taquito";
import network from "network";
import useBeacon from "./useBeacon";

export const useAddress = () => {
  const { wallet } = useBeacon();
  const [address, setAddress] = useState("");

  useEffect(() => {
    wallet
      ?.getPKH()
      .then((address) => {
        console.log("userAddress", address)
        setAddress(address)
      })
      .catch(console.error);
  }, [wallet]);

  return address;
};

export const useBalace = () => {
  const {Tezos} = useBeacon();
  const [balance, setBalance] = useState<number>(0);
  const address = useAddress();

  useEffect(() => {
    if (address) {
      Tezos.tz
        .getBalance(address)
        .then((balance) => setBalance(balance.toNumber()))
        .catch(console.error);
    }
  }, [Tezos, address]);

  return balance;
};

export const useContract = () => {
  const { Tezos, connected } = useBeacon();
  const [contract, setContract] = useState<
    ContractAbstraction<Wallet> | undefined
  >(undefined);

  useEffect(() => {
    if (connected) {
      Tezos.wallet
        .at(network.contractAddress)
        .then((contract) => {
          console.log("contract", contract);
          setContract(contract);
          return contract;
        })
        .catch(console.error);
    }
  }, [Tezos, connected]);

  return { contract };
};

export const useAdminMethod = () => {
  const { contract } = useContract();

  const readyRace = useCallback(() => {
    return contract?.methods
      .readyRace(60)
      .send()
      .then((result) => {
        console.info("readyRace", result);
        return result;
      })
      .catch((error) => {
        console.error("readyRace", error);
      });
  }, [contract]);

  const startRace = useCallback(() => {
    return contract?.methods
      .startRace()
      .send()
      .then((result) => {
        console.info("startRace", result);
        return result;
      })
      .catch((error) => {
        console.error("startRace", error);
      });
  }, [contract]);

  const finishRace = useCallback(() => {
    return contract?.methods
      .takeReward()
      .send()
      .then((result) => {
        console.info("finishRace", result);
        return result;
      })
      .catch((error) => {
        console.error("finishRace", error);
      });
  }, [contract]);

  return {
    readyRace,
    startRace,
    finishRace,
  };
};

export const useMethod = () => {
  const { contract } = useContract();

  const getStorage = useCallback(
    (setStorage) => {
      return contract?.storage().then((storage) => {
        console.log("storage", storage);
        setStorage(storage);
      });
    },
    [contract]
  );

  const placeBet = useCallback((raceId, horseId, payout, amount) => {
    /*if (contract) {
      const methods = contract.parameterSchema.ExtractSignatures();
      console.log(JSON.stringify(methods, null, 2));

      const incrementParams = contract.methods.placeBet(raceId, horseId, payout).toTransferParams();
      console.log(JSON.stringify(incrementParams, null, 2));
    }*/
    console.log("placeBet", raceId, horseId, payout, amount)

    return contract?.methods
      .placeBet(horseId, payout, raceId)
      .send({ amount: amount })
      .then((result) => {
        console.info("placeBet", result);
        return result;
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, [contract]);

  const takeReward = useCallback(() => {
    return contract?.methods
      .takeReward()
      .send()
      .then((result) => {
        console.info("takeReward", result);
        return result;
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, [contract]);

  return {
    getStorage,
    placeBet,
    takeReward,
  };
};
