import { createBrowserRouter } from "react-router-dom";
import App from "./App"
import HomePage from './pages/HomePage'
import PrivateRoute from "./components/PrivateRoute";
import PortfolioPage from "./pages/PortfolioPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound"
import ProfilePage from "./pages/ProfilePage"
import StockPage from "./pages/StockPage"
import RegisterPage from "./pages/RegisterPage";
import axiosInstance from "./axios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true, 
        element: <HomePage />, 
        loader: async () => {
            try {
            const response = await axiosInstance.get('api/portfolio/homepage/');
            console.log('Loader response:', response.data); // Debug log
            return response.data;
            } catch (error) {
            console.error('Loader error:', error); // Debug log
            throw new Response("Failed to load content", { 
                status: error.response?.status || 500 
            });
            }
        }
      }, 

      { path: "login", element: <LoginPage /> },
      {path: "register", element: <RegisterPage />},
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