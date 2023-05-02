export type Nullable<T> = T | null;

export type Race = {
  admin: string;
  paused: boolean;
  race_id: number;
  start_time: string;
  status: string;
  winner: number;
};

export const RaceState = {
  None: '0',
  Ready: '1',
  Started: '2',
  Finished: '3',
};

export type GameContextApi = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  race: Race | null;
  setRace: (race: Race | null) => void;
  refresh: () => Promise<void>;
}
