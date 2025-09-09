import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import Game from "./components/Game";
import { useEffect, useState } from "react";
import { socket } from "./components/socket";

function App() {
  const navigate = useNavigate();

  interface Player {
    socketId: string;
    isPartyLeader?: boolean;
    nickname: string;
  }

  interface Game {
    _id: string;
    words: string[];
    players: Player[];
    isOpen: boolean;
  }

  const [gameState, setGameState] = useState<Game>({
    _id: "",
    words: [],
    players: [],
    isOpen: false,
  });

  useEffect(() => {
    const handleUpdateGame = (game: Game) => {
      setGameState(game);
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
