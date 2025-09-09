import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";

const Index = () => {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/game/create",
      element: <CreateGame />,
    },
    {
      path: "/game/join",
      element: <JoinGame />,
    },
  ]);
  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
};

export default Index;
