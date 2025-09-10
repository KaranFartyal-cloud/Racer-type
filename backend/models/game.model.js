import mongoose from "mongoose";

const playerSchema = mongoose.Schema({
  currentWordIndex: { type: Number, default: 0 },
  isPartyLeader: { type: Boolean, default: false },
  socketId: { type: String },
  nickname: { type: String },
  WPM: { type: Number, default: -1 },
});

const gameSchema = mongoose.Schema({
  words: [{ type: String }],
  isOver: { type: Boolean, default: false },
  isOpen: { type: Boolean, default: true },
  players: [playerSchema],
  startTime: { type: Number },
});

export const Game = mongoose.model("Game", gameSchema);
