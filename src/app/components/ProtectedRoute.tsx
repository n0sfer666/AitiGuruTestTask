import type { FC, ReactNode } from "react";

import { $auth, logout } from "@modules/auth/model";
import { getToken } from "@shared/utils/cookies";
import { isTokenExpired } from "@shared/utils/jwt";
import { useStore } from "effector-react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  children?: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useStore($auth);
  const token = getToken();

  if (token && isTokenExpired(token)) {
    logout();
    return <Navigate to="/login" replace />;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ?? <Outlet />;
};
