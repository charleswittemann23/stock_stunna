import { createBrowserRouter } from "react-router-dom";
import App from "./App"
import HomePage from './pages/HomePage'
import PrivateRoute from "./components/PrivateRoute";
import PortfolioPage from "./pages/PortfolioPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            {
                path: "portfolio/",
                element: (
                    <PrivateRoute>
                        <PortfolioPage />
                    </PrivateRoute>
                ),
            },
        ],
        errorElement: <NotFound />
    },
]);

export default router;