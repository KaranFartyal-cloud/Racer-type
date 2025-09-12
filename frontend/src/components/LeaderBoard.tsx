import { useAppSelector } from "../../hooks/hooks.ts";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Player {
  socketId: string;
  nickname: string;
  isPartyLeader: boolean;
  _id: string;
  currentWordIndex: number;
  WPM: number;
}

interface Game {
  _id: string;
  players: Player[];
  isOpen: boolean;
  words: string[];
  isOver: boolean;
  startTime: number;
}

const getScoreBoard = (players: Player[]) => {
  const scoreBoard = players.filter((player) => player.WPM !== -1);
  return scoreBoard.sort((a, b) => b.WPM - a.WPM);
};

const LeaderBoard = () => {
  const gameState: Game = useAppSelector((store) => store.game);
  const scoreBoard = getScoreBoard(gameState.players);

  if (scoreBoard.length === 0) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <div className="mt-7 flex ">
        <Table className="w-[800px]">
          <TableCaption>Racing Type LeaderBoard</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">#</TableHead>
              <TableHead className="text-center">User</TableHead>
              <TableHead className="text-center">WPM</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow> */}
            {scoreBoard.map((p: Player, index: number) => {
              return (
                <>
                  <TableRow>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center">{p.nickname}</TableCell>
                    <TableCell className="text-center">{p.WPM}</TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeaderBoard;
