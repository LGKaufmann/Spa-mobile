import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Define a type for user state if not already defined
interface UserState {
  user: {
    userType: string;
  };
}

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType: string; // Add a required user type prop
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredUserType,
}) => {
  const { user } = useSelector((state: any) => state.users);

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
