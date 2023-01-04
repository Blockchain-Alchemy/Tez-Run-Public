export const RaceState = {
  None: '0',
  Ready: '1',
  Started: '2',
  Finished: '3',
};

export type Race = {
  admin: string;
  paused: boolean;
  race_id: number;
  start_time: string;
  status: string;
  winner: number;
};

export type Ticket = {
  id: number;
  address: string;
  horseId: number;
  token: number;
  tezos: number;
  amount: number;
  payout: number;
  pending: boolean;
}
