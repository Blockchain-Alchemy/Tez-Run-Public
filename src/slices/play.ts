import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { Ticket } from "pages/play/types";

interface PlayState {
  loading: boolean;
  connected: boolean;
  playerId: string | null;
  roomId: number | null;
  startTime: string | null;
  banned: boolean;
  tickets: Ticket[];
}

const initialState: PlayState = {
  loading: false,
  connected: false,
  playerId: null,
  roomId: 0,
  startTime: null,
  banned: false,
  tickets: [],
};

const getMaxTicketId = (tickets: Ticket[]) => {
  return tickets.reduce((prev, ticket) => {
    return Math.max(prev, ticket.id);
  }, 0);
};

const slice = createSlice({
  name: "play",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setConnected(state, action: PayloadAction<boolean>) {
      state.connected = action.payload;
      if (!state.connected) {
        state.playerId = null;
      }
    },
    setPlayerId(state, action: PayloadAction<string | null>) {
      state.playerId = action.payload;
    },
    setRoomId(state, action: PayloadAction<string | null>) {
      state.roomId = Number(action.payload);
    },
    setStartTime(state, action: PayloadAction<string | null>) {
      state.startTime = action.payload;
    },
    setOpenRoom(state, action: PayloadAction<string | null>) {
      const item = JSON.parse(action.payload!);
      state.roomId = item.id;
      state.startTime = item.startTime;
    },
    setJoinedRoom(state, action: PayloadAction<string | null>) {
      const item = JSON.parse(action.payload!);
      state.playerId = item.playerId;
      state.roomId = item.roomId;
      state.startTime = item.startTime;
    },
    setBanned(state, action: PayloadAction<boolean>) {
      state.banned = action.payload;
    },
    addPendingTicket(state, action: PayloadAction<Ticket>) {
      action.payload.id = getMaxTicketId(state.tickets) + 1;
      state.tickets.push({ ...action.payload });
    },
    updateTickets(state, action: PayloadAction<Ticket[]>) {
      let pendingTickets = state.tickets
        .filter((t) => !!t.pending)
        .sort((a, b) => a.id - b.id);

      if (pendingTickets.length > 0) {
        pendingTickets = pendingTickets.filter(
          (i) => !action.payload.find((t) => t.id === i.id)
        );
      }
      state.tickets = [...action.payload, ...pendingTickets];
    },
  },
});

export const { reducer } = slice;

export const {
  setLoading,
  setConnected,
  setPlayerId,
  setRoomId,
  setStartTime,
  setJoinedRoom,
  setOpenRoom,
  setBanned,
  addPendingTicket,
  updateTickets,
} = slice.actions;
