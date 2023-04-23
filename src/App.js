import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import AuthProvider from "./store/AuthProvider";
import { AuthProvider } from "./context/AuthContext";
import { StationProvider } from "./context/StationContext";

import { Loader as trainlistLoader } from "./pages/TrainList";
import SignUp from "./pages/SignUp";
import Home from "./components/Home/Home";
import LogIn from "./pages/LogIn";
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
      /* loader: trainlistLoader, */
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

/*

 Pages
 1- SignUp
 2- List of trains and booking
 3- Dashboard, Signup+Logout+AccountDetailsOption
 4- Login Modal
 5- Account/Booking Details
 6- PNR Status
 7- Station Code from id
 
 Upon Authentication:
 1- Book Tickets
 Components
 1- NavBar
 
 Component Styling:
 1- HomePage
 2-
*/
