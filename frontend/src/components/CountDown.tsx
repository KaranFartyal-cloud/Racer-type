import React, { useEffect, useState } from "react";
import { socket } from "./socket.ts";

const CountDown = () => {
  const [timer, setTimer] = useState({ countDown: "", msg: "" });

  useEffect(() => {
    socket.on("timer", (data) => {
      setTimer(data);
    });

    socket.on("done", () => {
      socket.removeListener("timer");
    });
  }, []);
  return (
    <div>
      <h1 className="text-center text-5xl">{timer.countDown}</h1>
      <h1 className="text-center my-3 font-semibold text-lg">{timer.msg}</h1>
    </div>
  );
};

export default CountDown;
