import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Dashboard";
import ErrorPage from "./ErrorPage";
import Post from "./Post";
import Logout from "./Logout";
import App from "./App";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/logout",
      element: <Logout />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/:postId",
      element: <Post />,
      errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
