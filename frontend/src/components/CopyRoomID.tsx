import React, { useState } from "react";
import { Input } from "./ui/input";
import { useAppSelector } from "../../hooks/hooks.ts";
import { Button } from "./ui/button";

const CopyRoomID = () => {
  const gameState = useAppSelector((store) => store.game);
  const [copied, setCopied] = useState(false);

  const copyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(gameState._id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="mt-[30px] w-full relative flex justify-center">
      <div className="relative w-[30%]">
        <Input
          className="h-[50px] pr-20" 
          readOnly
          value={gameState._id}
        />
        <Button
          className="absolute right-0 top-0 h-full text-white"
          onClick={copyToClipBoard}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  );
};

export default CopyRoomID;
