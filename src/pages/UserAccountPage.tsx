import { Box, Container, Flex } from "@chakra-ui/react";
import ChangeEmail from "../components/ChangeEmail";
import ChangePassword from "../components/ChangePassword";
import UserData from "../components/UserData";

const UserAccountPage = () => {
  return (
    <>
      <Container height="80vh" justifyContent="center" alignItems="center">
        <Flex>
          <Box width="860px">
            <UserData />
            <ChangePassword />
            <ChangeEmail />
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default UserAccountPage;
