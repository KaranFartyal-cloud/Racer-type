import { useAppSelector } from "../../hooks/hooks.ts";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input.tsx";
import { socket } from "./socket.ts";
const Form = () => {
  const game = useAppSelector((store) => store.game);
  const [userInput, setUserInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!game.isOpen) {
      inputRef.current?.focus();
    }
  }, [game.isOpen]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.currentTarget.value;
    let lastChar = val.charAt(val.length - 1);
    if (lastChar === " ") {
      socket.emit("user-input", { userInput: val.trim(), gameId: game._id });
      setUserInput("");
    } else {
      setUserInput(val);
    }
  };

  return (
    <div className="my-3 mb-5">
      <form>
        <Input
          readOnly={game.isOpen || game.isOver}
          type="text"
          ref={inputRef}
          placeholder={game.isOpen ? "Wait" : "Type Here..."}
          value={userInput}
          onChange={changeHandler}
          className="focus:outline-none focus:ring-0 focus:ring-offset-0"
        />
      </form>
    </div>
  );
};

export default Form;
