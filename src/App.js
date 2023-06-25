import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { useContext, useEffect, useState, } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { DarkModeContext } from "./context/darkModeContext";
import Navbar from "./components/navbar";
import LeftBar from "./components/leftbar";
import RightBar from "./components/rightbar";
import config from "./config";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { io } from "socket.io-client";

function App() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user.currentUser);
  const { darkMode } = useContext(DarkModeContext);
  const queryClient = new QueryClient()




  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    );
  };


  const ProtectedRoute = ({ children }) => {
    if (user === null) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: config.routes.home.path,
          element: config.routes.home.element,
        },
        {
          path: config.routes.profile.path,
          element: config.routes.profile.element,
        },
        {
          path: config.routes.friends.path,
          element: config.routes.friends.element,
        },
        {
          path: config.routes.chat.path,
          element: config.routes.chat.element,
        },
      ],
    },

    {
      path: config.routes.login.path,
      element: config.routes.login.element,
    },
    {
      path: config.routes.register.path,
      element: config.routes.register.element,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;