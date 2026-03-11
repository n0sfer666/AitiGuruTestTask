import { LoginPage } from "@pages/LoginPage/LoginPage";
import { NotFoundPage } from "@pages/NotFoundPage";
import { ProductsPage } from "@pages/ProductsPage/ProductsPage";
import { SignupPage } from "@pages/SignupPage";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/products" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/products",
    element: (
      <ProtectedRoute>
        <ProductsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
