import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home/Home";
import Network from "./pages/networks/Network";
import Admin from "./pages/admin/Admin";
import Login from "./pages/login/Login";
import Private from "./routes/Private";
import Error from "./pages/error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <Private>
        <Admin />,
      </Private>
    ),
  },
  {
    path: "/admin/social",
    element: (
      <Private>
        <Network />,
      </Private>
    ),
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export { router };
