import StartBtn from "./StartBtn";
import CountDown from "./CountDown.tsx";
import DisplayWords from "./DisplayWords.tsx";
import PlayerProgress from "./PlayerProgress.tsx";

const Game = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <DisplayWords />
        <PlayerProgress />
        <CountDown />
        <StartBtn />
      </div>
    </>
  );
};

export default Game;
