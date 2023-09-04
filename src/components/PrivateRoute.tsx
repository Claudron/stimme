import { Box } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import usePersistLogin from "../hooks/usePersistLogin";
import PrivateNavBar from "./PrivateNavBar";

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = usePersistLogin();

  if (isLoading) {
    return null; // maybe loading spinner or other placeholder component later
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <PrivateNavBar />
      <Box padding={5}>
        <Outlet />
      </Box>
    </>
  );
};

export default PrivateRoute;
