import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/dbConnect.js";
import { Game } from "./models/game.model.js";
import path from "path";
import getData from "./api/quotable.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
connectDb();

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join-game", async ({ gameId: _id, nickname }) => {
    try {
      console.log("join game emitted");
      let game = await Game.findById(_id);
      console.log("finding game");
      if (game.isOpen) {
        const gameId = game._id.toString();
        socket.join(gameId);
        let player = {
          socketId: socket.id,
          nickname,
        };

        console.log("game found");

        game.players.push(player);
        game = await game.save();

        console.log("game saved");

        console.log(`sending message to ${game._id} room`);

        io.to(gameId).emit("update-game", game);

        console.log("send update-game event there");
      }
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("create-game", async (nickname) => {
    let game = new Game();
    const words = await getData();

    game.words = words;

    let player = {
      isPartyLeader: true,
      socketId: socket.id,
      nickname,
    };

    game.players.push(player);

    game = await game.save();

    const gameId = game._id.toString();
    socket.join(gameId);
    io.to(gameId).emit("update-game", game);
  });
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
