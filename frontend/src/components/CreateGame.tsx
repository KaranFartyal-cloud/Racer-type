import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { socket } from "./socket.ts";
import { useState } from "react";

const CreateGame = () => {
  const [nickname, setNickname] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      socket.emit("create-game", nickname);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-screen">
        <h1 className="text-center font-semibold text-3xl my-3">Create Game</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <Input
              className="my-3 w-[50%] focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Enter your nickname.."
              onChange={(e) => setNickname(e.target.value)}
              value={nickname}
            />

            <Button
              variant={"ghost"}
              className="bg-yellow-400 text-white"
              type="submit"
            >
              Create room
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateGame;
