import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import useUserData from "../hooks/useUserData";

const UserData = () => {
  const { data, isLoading, isError, error } = useUserData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (data) {
    return (
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        boxShadow="lg"
        marginBottom={5}
      >
        <Heading  marginBottom={5}>Your Account</Heading>
        <VStack align="start">
          <Text fontSize="xl">Email: {data.email}</Text>
          <Text fontSize="xl">First Name: {data.first_name}</Text>
          <Text fontSize="xl">Last Name: {data.last_name}</Text>
        </VStack>
      </Box>
    );
  }

  return null;
};

export default UserData;
