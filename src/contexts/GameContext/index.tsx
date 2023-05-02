import { useContext } from 'react';
import { GameContext, GameProvider } from './Provider';

const useGame = () => {
  const walletContext = useContext(GameContext);

  if (walletContext === undefined) {
    throw new Error('Wallet context undefined');
  }

  return walletContext;
};

export { useGame, GameProvider };
