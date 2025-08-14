import { createBrowserRouter } from "react-router-dom";
import App from "./App"
import HomePage from './pages/HomePage'
import PrivateRoute from "./components/PrivateRoute";
import PortfolioPage from "./pages/PortfolioPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound"
import ProfilePage from "./pages/ProfilePage"
import StockPage from "./pages/StockPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "stocks", element: <StockPage />},

      // Grouped private routes
      {
        element: <PrivateRoute />, // This wraps all children below
        children: [
          { path: "portfolio", element: <PortfolioPage /> },
          { path: "myprofile", element: <ProfilePage /> },
        ],
      },
    ],
  },
]);


export default router;