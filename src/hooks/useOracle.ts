import { useEffect, useState } from "react";
import useBeacon from "./useBeacon";

export const useRandomNumber = () => {
  const { tezos } = useBeacon();
  const [randomNumber, setRandomNumber] = useState<number>(0);

  useEffect(() => {
    tezos?.wallet.at("KT18hPvyyVF86AHLkMBKPPHXZb8TFogphbxi")
      .then(contract => {
        return contract.storage();
      })
      .then((storage: any) => {
        setRandomNumber(storage.toNumber());
      })
  }, [tezos]);

  return randomNumber;
};