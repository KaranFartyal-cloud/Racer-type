import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { socket } from "./socket.ts";

const JoinGame = () => {
  const [nickname, setNickname] = useState<string>("");
  const [gameId, setGameId] = useState<string>("");
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      socket.emit("join-game", { nickname, gameId });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen">
      <h1 className="text-center font-semibold text-3xl my-3">Join Room</h1>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col items-center">
          <Input
            className="my-3 w-[50%] focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Enter your nickname.."
            onChange={(e) => setNickname(e.target.value)}
            value={nickname}
          />

          <Input
            className="my-3 w-[50%] focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Enter RoomId"
            onChange={(e) => setGameId(e.target.value)}
            value={gameId}
          />

          <Button
            variant={"ghost"}
            className="bg-yellow-400 text-white"
            type="submit"
          >
            Join Room
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JoinGame;
