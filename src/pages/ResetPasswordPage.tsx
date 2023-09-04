import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Alert,
  AlertIcon,
  Container,
  Flex,
} from "@chakra-ui/react";
import useResetPassword from "../hooks/useRestPassword";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

const ResetPasswordPage = () => {
  const location = useLocation();
  const path = location.pathname;
  const [_, uid, token] = path.split("/").slice(-3);

  const newPasswordRef = useRef<HTMLInputElement>(null);
  const reNewPasswordRef = useRef<HTMLInputElement>(null);
  const resetPasswordMutation = useResetPassword();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (uid && token && newPasswordRef.current && reNewPasswordRef.current) {
      const newPassword = newPasswordRef.current.value;
      const reNewPassword = reNewPasswordRef.current.value;

      resetPasswordMutation.mutate(
        {
          uid,
          token,
          new_password: newPassword,
          re_new_password: reNewPassword,
        },
        {
          onSuccess: () => {
            if (newPasswordRef.current && reNewPasswordRef.current) {
              newPasswordRef.current.value = "";
              reNewPasswordRef.current.value = "";
            }
          },
          onError: () => {
            if (newPasswordRef.current && reNewPasswordRef.current) {
              newPasswordRef.current.value = "";
              reNewPasswordRef.current.value = "";
            }
          },
        }
      );
    }
  };

  return (
    <Container height="80vh" justifyContent="center" alignItems="center">
      <Flex>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          boxShadow="lg"
          marginBottom={5}
        >
          <Heading marginBottom={5}>Reset Password</Heading>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>
                New Password:
                <Input
                  ref={newPasswordRef}
                  type="password"
                  name="newPassword"
                  required
                />
              </FormLabel>
              <FormLabel>
                Repeat New Password:
                <Input
                  ref={reNewPasswordRef}
                  type="password"
                  name="reNewPassword"
                  required
                />
              </FormLabel>
              <Button type="submit">Reset Password</Button>
            </FormControl>
          </form>
          {resetPasswordMutation.isLoading && <div>Changing password...</div>}
          {resetPasswordMutation.isError && (
            <Alert status="error">
              <AlertIcon />
              {resetPasswordMutation.error.message}
            </Alert>
          )}
          {resetPasswordMutation.isSuccess && (
            <Alert status="success">
              <AlertIcon />
              Password has been changed successfully
            </Alert>
          )}
        </Box>
      </Flex>
    </Container>
  );
};

export default ResetPasswordPage;
