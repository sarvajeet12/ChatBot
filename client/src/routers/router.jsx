import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home.jsx";
import Error from "../pages/error.jsx";
import Dashboard from "../pages/dashboard.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
        { path: "/dashboard", element: <Dashboard /> },
      { path: "*", element: <Error /> },
    ],
  },
]);
