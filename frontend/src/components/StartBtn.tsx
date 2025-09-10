import { useState } from "react";
import { useAppSelector } from "../../hooks/hooks.ts";
import { socket } from "./socket.ts";
import { Button } from "./ui/button.tsx";

interface Player {
  socketId: string;
  isPartyLeader?: boolean;
  nickname: string;
  _id: string;
}

const StartBtn = () => {
  const gameState = useAppSelector((store) => store.game);
  const player = gameState.players.find((p) => p.socketId === socket.id);
  const [showbtn, setShowbtn] = useState<boolean>(true);
  // console.log(player);

  const isPartyLeader = player?.isPartyLeader ?? false;

  const onClickHandler = () => {
    const data = {
      gameId: gameState._id,
      playerId: player?._id,
    };
    socket.emit("timer", data);
    setShowbtn(false);
  };

  return (
    <>
      {isPartyLeader && showbtn ? (
        <>
          <div className="flex justify-center">
            <Button
              variant={"secondary"}
              className="bg-blue-500 text-white "
              onClick={onClickHandler}
            >
              Start game
            </Button>
          </div>
        </>
      ) : null}
    </>
  );
};

export default StartBtn;
