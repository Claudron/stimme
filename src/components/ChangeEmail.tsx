import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import useChangeEmail from "../hooks/useChangeEmail";
import { useRef } from "react";

const ChangeEmail = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const changeEmailMutation = useChangeEmail();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailRef.current) {
      const newEmail = emailRef.current.value;

      changeEmailMutation.mutate(
        { email: newEmail },
        {
          // Reset form field when mutation is successful
          onSuccess: () => {
            if (emailRef.current) {
              emailRef.current.value = "";
            }
          },
          // Optionally, reset form field even when the mutation fails
          onError: () => {
            if (emailRef.current) {
              emailRef.current.value = "";
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
        Change Email
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>
            New Email:
            <Input
              id="newEmailInput"
              ref={emailRef}
              type="email"
              name="newEmail"
              required
            />
          </FormLabel>
          <Button type="submit">Change Email</Button>
        </FormControl>
      </form>
      {changeEmailMutation.isLoading && <div>Changing email...</div>}
      {changeEmailMutation.isError && (
        <div>Error: {changeEmailMutation.error.message}</div>
      )}
      {changeEmailMutation.isSuccess && (
        <div>
          <p>Email has been changed successfully.</p>
          <p>Please refresh the page</p>
        </div>
      )}
    </Box>
  );
};

export default ChangeEmail;
