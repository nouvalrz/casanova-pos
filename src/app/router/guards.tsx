import React from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const user = true;
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  const user = true;
  return user ? <Navigate to="/" replace /> : <>{children}</>;
};

type Role = "owner" | "staff";

const RoleGuard = ({
  role,
  children,
}: {
  role: Role | Role[];
  children: React.ReactNode;
}) => {
  const user = { role: "owner" };

  const roles = Array.isArray(role) ? role : [role];

  if (!user) return <Navigate to="/login" />;
  if (!roles.includes(user.role)) return <Navigate to="/" />;

  return <>{children}</>;
};

export { AuthGuard, GuestGuard, RoleGuard };
