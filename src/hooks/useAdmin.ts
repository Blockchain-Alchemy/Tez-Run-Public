import {useCallback} from "react";
import useBeacon from "./useBeacon";

const useAdmin = () => {
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
      .ready_race(5)
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
      .start_race(0)
      .send()
      .then((result) => {
        console.info("startRace", result);
        return result;
      })
      .catch((error) => {
        console.error("startRace", error);
      });
  }, [contract]);


  const finishRace = useCallback((winner) => {
    console.log("finishRace:winner=", winner)
    return contract?.methods
      .finish_race(winner)
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

export default useAdmin;
