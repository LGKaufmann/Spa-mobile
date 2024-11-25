import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Define a type for the user state
interface User {
  userType: string;
}

interface RootState {
  users: {
    user: User | null; // User can be null if not authenticated
  };
}

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredUserType,
}) => {
  const user = useSelector((state: RootState) => state.users.user);

  // Check if the user is logged in and has the required user type
  if (user && user.userType === requiredUserType) {
    return <>{children}</>; // Render the protected component
  } else {
    return <Navigate to="/" />; // Redirect to home if not authorized
  }
};

export const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ProtectedRoute requiredUserType="admin">{children}</ProtectedRoute>;
};

export const ProtectedAdminAppRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ProtectedRoute requiredUserType="admin">{children}</ProtectedRoute>;
};

export const ProtectedSecretaryRoute: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <ProtectedRoute requiredUserType="secretaria">{children}</ProtectedRoute>
  );
};

export const ProtectedProfessionalRoute: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <ProtectedRoute requiredUserType="profesional">{children}</ProtectedRoute>
  );
};
