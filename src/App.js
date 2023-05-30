import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import SignUp from "./pages/SignUp";
import Home from "./components/Home/Home";
import LogIn from "./pages/LogIn.js";
import Pnr from "./pages/Pnr";
import TrainList from "./pages/TrainList";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <LogIn /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/PNRstatus", element: <Pnr /> },
    {
      path: "/trainlist",
      element: <TrainList />,
    },
    {
      path: "/dashboard",
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
    },
    {
      path: "/account",
      element: (
        <PrivateRoute>
          <Account />
        </PrivateRoute>
      ),
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
