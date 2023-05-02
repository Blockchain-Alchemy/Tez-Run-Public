import React, { createContext, useState, useCallback, ReactNode } from "react";
import { useIndexer } from "hooks/useIndexer";
import { Nullable, GameContextApi, Race } from "./types";

export const GameContext = createContext<GameContextApi>({} as GameContextApi);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { getGameState } = useIndexer();

  const [loading, setLoading] = useState(false);
  const [race, setRace] = useState<Nullable<Race>>(null);

  const refresh = useCallback(async () => {
    try {
      const game = await getGameState();
      if (game.race) {
        setRace(game.race);
      }
    } catch (err) {
      console.error(err);
    }
  }, [getGameState]);

  return (
    <GameContext.Provider
      value={{
        loading,
        setLoading,
        race,
        setRace,
        refresh,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
