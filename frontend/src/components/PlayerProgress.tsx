import { useAppSelector } from "../../hooks/hooks.ts";
import { socket } from "./socket.ts";
import { Progress } from "@/components/ui/progress";

const PlayerProgress = () => {
  const { players, words } = useAppSelector((store) => store.game);
  const player = players.find((p) => p.socketId === socket.id);

  const calculateProgress = (player: any, words: string[]) => {
    if (!player || words.length === 0) return 0;
    return (player.currentWordIndex / words.length) * 100;
  };

  return (
    <>
      {/* player progress bar */}
      <div className="w-[100%] flex justify-center items-center gap-3">
        <Progress
          value={calculateProgress(player, words)}
          className="w-[60%] h-4"
        />
        <span className="text-lg font-medium">
          {player?.nickname ?? "Unknown Player"}
        </span>
      </div>

      {players.map((p) => {
        return (
          p.socketId !== socket.id && (
            <div className="w-[100%] flex justify-center items-center gap-3">
              <Progress
                value={calculateProgress(p, words)}
                className="w-[60%] h-4"
              />
              <span className="text-lg font-medium">
                {p?.nickname ?? "Unknown Player"}
              </span>
            </div>
          )
        );
      })}
    </>
  );
};

export default PlayerProgress;
