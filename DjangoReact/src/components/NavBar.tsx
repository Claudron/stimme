import { HStack, Text } from "@chakra-ui/react";
import ColrModeSwitch from "./ColorModeSwitch";
import { Link, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import useAuthStore from "../auth/useAuthStore"; // Import your Zustand store
import useLogout from "../hooks/useLogout";

const NavBar = () => {
  // Get the user email from Zustand store
  const userEmail = useAuthStore((state) => state.userEmail);
  const resetUserData = useAuthStore();
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = async () => {
    try {
      await logout();
      // resetUserData.clearTokens();
      // resetUserData.clearUserEmail();
      resetUserData.setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      // Handle the logout error
      console.error(error);
    }
  };

  return (
    <HStack justifyContent={"space-between"} padding="10px">
      <Link to="/">Home</Link>
      <Link to="/posts">Posts</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/download">Downloads</Link>
      {!userEmail && <Link to="/login">Login</Link>}
      {userEmail && <Text>Hello {userEmail}</Text>}
      {userEmail && <ChakraLink onClick={handleLogout}>Logout</ChakraLink>}
      <ColrModeSwitch />
    </HStack>
  );
};

export default NavBar;
