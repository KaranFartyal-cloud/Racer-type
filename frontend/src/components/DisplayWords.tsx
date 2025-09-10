import Form from "./Form.tsx";
import { useAppSelector } from "../../hooks/hooks.ts";
import { socket } from "./socket.ts";

const DisplayWords = () => {
  const gameState = useAppSelector((store) => store.game);
  const player = gameState.players.find((p) => p.socketId === socket.id);
  const { words } = gameState;
  const currentIndex = player?.currentWordIndex ?? 0;

  const getTypedWords = () => {
    return (
      <span className="bg-green-500">
        {gameState.words.slice(0, currentIndex).join(" ")}
      </span>
    );
  };

  const getCurrentWord = () => {
    return <span className="underline"> {gameState.words[currentIndex]}</span>;
  };

  const getWordsToBeTyped = () => {
    return (
      <span className="">
        {" "}
        {gameState.words.slice((currentIndex ?? 0) + 1, words.length).join(" ")}
      </span>
    );
  };

  return (
    <>
      {" "}
      <div className="my-4 bg-gray-200 max-w-3xl p-3 shadow-md rounded-lg">
        {getTypedWords()}
        {getCurrentWord()}
        {getWordsToBeTyped()}
      </div>
      <Form />
    </>
  );
};

export default DisplayWords;
