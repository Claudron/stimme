import { Box, Text, VStack } from "@chakra-ui/react";
import useUserData from "../hooks/useUserData";
import useChangePassword from "../hooks/useChangePassword";
import { useRef } from "react";

const UserData = () => {
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, isError, error } = useUserData();
  const changePasswordMutation = useChangePassword();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (currentPasswordRef.current && newPasswordRef.current) {
      const currentPassword = currentPasswordRef.current.value;
      const newPassword = newPasswordRef.current.value;

      changePasswordMutation.mutate(
        { current_password: currentPassword, new_password: newPassword },
        {
          // Reset form fields when mutation is successful
          onSuccess: () => {
            if (currentPasswordRef.current && newPasswordRef.current) {
              currentPasswordRef.current.value = "";
              newPasswordRef.current.value = "";
            }
          },
          // Optionally, reset form fields even when the mutation fails
          onError: () => {
            if (currentPasswordRef.current && newPasswordRef.current) {
              currentPasswordRef.current.value = "";
              newPasswordRef.current.value = "";
            }
          },
        }
      );
    }
  };

  console.log("Mutation state:", changePasswordMutation);

  if (data) {
    return (
      <>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          boxShadow="lg"
          marginBottom={5}
        >
          <VStack align="start">
            <Text fontSize="xl">Email: {data.email}</Text>
            <Text fontSize="xl">First Name:{data.first_name}</Text>
            <Text fontSize="xl">Last Name: {data.last_name}</Text>
          </VStack>
        </Box>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          boxShadow="lg"
          marginBottom={5}
        >
          <h1>Change password:</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Current password:
              <input
                ref={currentPasswordRef}
                type="password"
                name="currentPassword"
                required
              />
            </label>
            <label>
              New password:
              <input
                ref={newPasswordRef}
                type="password"
                name="newPassword"
                required
              />
            </label>
            <button type="submit">Change password</button>
          </form>
        </Box>
        {changePasswordMutation.isLoading && <div>Changing password...</div>}
        {changePasswordMutation.isError && (
          <div>Error: {changePasswordMutation.error.message}</div>
        )}
        {changePasswordMutation.isSuccess && (
          <div>Password has been changed successfully</div>
        )}
      </>
    );
  }

  return null;
};

export default UserData;