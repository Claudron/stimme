import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import useChangePassword from "../hooks/useChangePassword";
import { useRef } from "react";

const ChangePassword = () => {
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const changePasswordMutation = useChangePassword();

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

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      boxShadow="lg"
      marginBottom={5}
    >
      <Heading as="h3" size="lg" marginBottom={5}>
        Change Password
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>
            Current Password:
            <Input
              id="currentPasswordInput"
              ref={currentPasswordRef}
              type="password"
              name="currentPassword"
              required
            />
          </FormLabel>
          <FormLabel>
            New Password:
            <Input
              id="newPasswordInput"
              ref={newPasswordRef}
              type="password"
              name="newPassword"
              required
            />
          </FormLabel>
          <Button type="submit">Change Password</Button>
        </FormControl>
      </form>
      {changePasswordMutation.isLoading && <div>Changing password...</div>}
      {changePasswordMutation.isError && (
        <div>Error: {changePasswordMutation.error.message}</div>
      )}
      {changePasswordMutation.isSuccess && (
        <div>Password has been changed successfully</div>
      )}
    </Box>
  );
};

export default ChangePassword;
