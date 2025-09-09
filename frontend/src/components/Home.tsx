import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex my-3 flex-col items-center ">
        <h1 className="text-3xl">Racing Type</h1>
        <div className="flex items-center gap-3 my-3">
          <Button
            onClick={() => navigate("/game/create")}
            variant={"ghost"}
            className="bg-blue-500 text-white"
          >
            Create Game
          </Button>
          <Button
            onClick={() => navigate("/game/join")}
            variant={"ghost"}
            className="bg-blue-500 text-white"
          >
            Join Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
