import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Player {
  socketId: string;
  nickname: string;
  isPartyLeader: boolean;
  _id: string;
  currentWordIndex: number ;
  WPM: number;
}

interface Game {
  _id: string;
  players: Player[];
  isOpen: boolean;
  words: string[];
  isOver: boolean;
  startTime: number;
}

const initialState: Game = {
  _id: "",
  players: [],
  isOpen: false,
  words: [],
  isOver: false,
  startTime: -1,
};

const gameSlice = createSlice({
  name: "game",
  initialState,

  reducers: {
    setGame: (state, action: PayloadAction<Game>) => {
      return action.payload;
    },
  },
});

export const { setGame } = gameSlice.actions;
export default gameSlice.reducer;
