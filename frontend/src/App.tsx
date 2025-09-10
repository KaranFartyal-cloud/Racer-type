import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import Game from "./components/Game";
import { useEffect, useState } from "react";
import { socket } from "./components/socket";
import { useAppDispatch, useAppSelector } from "../hooks/hooks.ts";
import { setGame } from "../redux/gameSlice.ts";

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const gameState = useAppSelector((store) => store.game);

  interface Player {
    socketId: string;
    nickname: string;
    isPartyLeader: boolean;
    _id: string;
    currentWordIndex: number;
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

  useEffect(() => {
    const handleUpdateGame = (game: Game) => {
      console.log("update-game triggered");
      dispatch(setGame(game));
    };

    socket.on("update-game", handleUpdateGame);

    return () => {
      socket.off("update-game", handleUpdateGame);
    };
  }, []);

  useEffect(() => {
    console.log(gameState);
  }, [gameState]);

  useEffect(() => {
    if (gameState._id !== "") {
      navigate(`/game/${gameState._id}`);
    }
  }, [gameState._id]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game/create" element={<CreateGame />} />
      <Route path="/game/join" element={<JoinGame />} />
      <Route path="/game/:id" element={<Game />} />
    </Routes>
  );
}

export default App;
