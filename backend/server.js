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
  socket.on("user-input", async ({ userInput, gameId }) => {
    try {
      let game = await Game.findById(gameId);
      if (!game.isOpen && !game.isOver) {
        let player = game.players.find((p) => p.socketId === socket.id);
        let word = game.words[player?.currentWordIndex];

        if (word === userInput) {
          player.currentWordIndex++;
          if (player.currentWordIndex !== game.words.length) {
            game = await game.save();
            io.to(gameId).emit("update-game", game);
          } else {
            const endTime = new Date().getTime();
            const { startTime } = game;
            player.WPM = calculateWPM(endTime, startTime, player);
            game = await game.save();
            socket.emit("done");
            io.to(gameId).emit("update-game", game);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("timer", async ({ gameId, playerId }) => {
    try {
      let countDown = 5;

      let game = await Game.findById(gameId);
      const player = game.players.id(playerId);
      if (player.isPartyLeader) {
        let timerId = setInterval(async () => {
          if (countDown >= 0) {
            io.to(gameId).emit("timer", { countDown, msg: "game starting" });
            countDown--;
          } else {
            game.isOpen = false;
            game = await game.save();
            io.to(gameId).emit("update-game", game);
            startGameClock(gameId);
            clearInterval(timerId);
          }
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  });
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

const startGameClock = async (gameId) => {
  try {
    let game = await Game.findById(gameId);
    game.startTime = new Date().getTime();
    let timer = 120;
    game = await game.save();

    let formatedTime = formatedTimer(timer);
    io.to(gameId).emit("update-game", game);
    io.to(gameId).emit("timer", {
      countDown: formatedTime,
      msg: "Time remaining",
    });

    let timerId = setInterval(() => {
      if (timer > 0) {
        timer--;
        io.to(gameId).emit("timer", {
          countDown: formatedTimer(timer),
          msg: "Time remaining",
        });
      } else {
        (async () => {
          let endTime = new Date().getTime();
          let game = await Game.findById(gameId);
          game.isOver = true;
          let { startTime } = game;
          game.players.forEach((player, index) => {
            if (player.WPM == -1) {
              player.WPM = calculateWPM(endTime, startTime, player);
            }
          });

          game = await game.save();
          io.to(gameId).emit("update-game", game);
          clearInterval(timerId);
        })();
      }
    }, 1000);
  } catch (error) {
    console.log(error);
  }
};

function calculateWPM(endTime, startTime, player) {
  let words = player.currentWordIndex;
  let seconds = (endTime - startTime) / 1000;
  let minutes = seconds / 60;
  const WPM = Math.floor(words / minutes);
  return WPM;
}

function formatedTimer(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}
