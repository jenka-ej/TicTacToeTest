import { createBrowserRouter, RouterProvider } from "react-router-dom"
import GamePage from "../pages/GamePage"
import HistoryPage from "../pages/HistoryPage"
import LoginPage from "../pages/LoginPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/game",
    element: <GamePage />
  },
  {
    path: "/history",
    element: <HistoryPage />
  }
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}
