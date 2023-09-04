import { HStack, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavBar = () => {
  

  return (
    <HStack padding="10px">
      <Heading>The App</Heading>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      
    </HStack>
  );
};

export default NavBar;
