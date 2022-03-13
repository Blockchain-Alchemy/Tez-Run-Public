import Network from "network";
import { useCallback, useEffect, useState } from "react";
import useBeacon from "./useBeacon";

export const useAddress = () => {
  const { wallet } = useBeacon();
  const [address, setAddress] = useState("");

  useEffect(() => {
    setAddress("");
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
  const {tezos, address} = useBeacon();
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (tezos && address) {
      tezos.tz
        .getBalance(address)
        .then((balance) => setBalance(balance.toNumber()))
        .catch(console.error);
    }
  }, [tezos, address]);

  return balance;
};

export const useRandomNumber = () => {
  const { tezos } = useBeacon();
  const [randomNumber, setRandomNumber] = useState<number>(0);

  useEffect(() => {
    tezos?.wallet.at("KT18hPvyyVF86AHLkMBKPPHXZb8TFogphbxi")
      .then(contract => {
        console.log("contract2", contract);
        return contract.storage();
      })
      .then((storage: any) => {
        console.log("storage2", storage);
        setRandomNumber(storage.toNumber());
      })
  }, [tezos]);

  return randomNumber;
};

export const useAdminMethod = () => {
  const { contract } = useBeacon();

  const mint = useCallback(() => {
    return contract?.methods
      .mint("tz1hmPbNNcaH91bkrYDeyAbUmYzjbPtJjPQR", 500000)
      .send()
      .then((result) => {
        console.info("mint", result);
        return result;
      })
      .catch((error) => {
        console.error("mint", error);
      });
  }, [contract]);

  const readyRace = useCallback(() => {
    return contract?.methods
      .readyRace(5)
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
    mint,
    readyRace,
    startRace,
    finishRace,
  };
};

export const useMethod = () => {
  const { tezos, contract, setLoading } = useBeacon();

  const getStorage = useCallback((setStorage) => {
    return contract?.storage().then((storage) => {
      console.log("storage", storage);
      setStorage(storage);
    });
  }, [contract]);

  const approve = useCallback(() => {
    console.log("approve")
    setLoading(true);

    return tezos?.wallet.at(Network.uUSD)
      .then(contract => {
        console.info("uUSD.contract", contract);
        return contract?.methods.approve(Network.contractAddress, 1000000).send()
      })
      .then(result => {
        console.info("approve", result);
        return result;
      })
      .catch((error) => {
        console.error("error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tezos, setLoading]);

  const placeBet = useCallback((raceId, horseId, payout, amount) => {
    /*if (contract) {
      const methods = contract.parameterSchema.ExtractSignatures();
      console.log(JSON.stringify(methods, null, 2));

      const incrementParams = contract.methods.placeBet(raceId, horseId, payout).toTransferParams();
      console.log(JSON.stringify(incrementParams, null, 2));
    }*/
    console.log("placeBet", raceId, horseId, payout, amount)

    setLoading(true);

    return contract?.methods
      .placeBet(horseId, payout, raceId)
      .send({ amount: amount })
      .then((result) => {
        console.info("placeBet", result);
        return result;
      })
      .catch((error) => {
        console.error("error", error);
      })
      .finally(() => {
        console.error("finally");
        setLoading(false);
      });
  }, [contract, setLoading]);

  const takeReward = useCallback(() => {
    setLoading(true);

    return contract?.methods
      .takeReward()
      .send()
      .then((result) => {
        console.info("takeReward", result);
        return result;
      })
      .catch((error) => {
        console.error("error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [contract, setLoading]);

  return {
    getStorage,
    placeBet,
    takeReward,
    approve,
  };
};
