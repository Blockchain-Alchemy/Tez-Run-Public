import { useEffect, useState } from 'react';
import { ContractAbstraction, Wallet } from '@taquito/taquito';
import network from 'network';
import useBeacon from './useBeacon';

export const useAddress = () => {
  const { wallet } = useBeacon()
  const [address, setAddress] = useState('')

  useEffect(() => {
    wallet?.getPKH()
      .then(address => setAddress(address))
      .catch(console.error)
  }, [wallet])

  return { address }
}

export const useBalace = () => {
  const { Tezos } = useBeacon()
  const { address } = useAddress()
  const [ balance, setBalance ] = useState<number>(0)

  useEffect(() => {
    if (address) {
      Tezos.tz.getBalance(address)
        .then(balance => setBalance(balance.toNumber()))
        .catch(console.error)
    }
  }, [Tezos, address])

  return { balance }
}

export const useContract = () => {
  const { Tezos, connected } = useBeacon()
  const [ contract, setContract ] = useState<ContractAbstraction<Wallet> | undefined>(undefined)
  const [ storage, setStorage ] = useState<unknown>(undefined)

  useEffect(() => {
    console.log("useContract", connected);
    if (connected) {
      Tezos.wallet.at(network.contractAddress)
        .then(contract => {
          console.log("contract", contract)
          setContract(contract);
          return contract.storage();
        })
        .then(storage => setStorage(storage))
        .catch(console.error)
    }
  }, [Tezos, connected])

  return { contract, storage }
}

export const useRaceState = () => {
  const { storage } = useContract();

  return 0;
}
