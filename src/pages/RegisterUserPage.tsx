import React, { useRef } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Link as ChakraLink,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import useCreateUser from "../hooks/useCreateUser";

const RegisterUserPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const [error, setError] = React.useState<string | null>(null);

  const createUserMutation = useCreateUser();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailRef.current ? emailRef.current.value : "";
    const password = passwordRef.current ? passwordRef.current.value : "";
    const confirmPassword = confirmPasswordRef.current ? confirmPasswordRef.current.value : "";
    const first_name = firstNameRef.current ? firstNameRef.current.value : "";
    const last_name = lastNameRef.current ? lastNameRef.current.value : "";

    const formData = { email, password, confirmPassword, first_name, last_name };

    console.log(formData);

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    createUserMutation.mutate(formData, {
      // Reset form field when mutation is successful
      onSuccess: () => {
        if (emailRef.current) emailRef.current.value = "";
        if (passwordRef.current) passwordRef.current.value = "";
        if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";
        if (firstNameRef.current) firstNameRef.current.value = "";
        if (lastNameRef.current) lastNameRef.current.value = "";
        setError(null);
      },
    });
  };

  return (
    <Container height="80vh" justifyContent="center" alignItems="center">
      <Flex>
        <Box
          width="500px"
          padding={4}
          borderColor="blackAlpha 50"
          borderWidth="1px"
          borderRadius={10}
        >
          <SimpleGrid padding={2}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input ref={emailRef} type="email" name="email" />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input ref={passwordRef} type="password" name="password" />
              </FormControl>
              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input ref={confirmPasswordRef} type="password" name="confirmPassword" />
              </FormControl>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input ref={firstNameRef} type="text" name="first_name" />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input ref={lastNameRef} type="text" name="last_name" />
              </FormControl>
              <Button type="submit" marginTop={5}>
                Register
              </Button>
            </form>
            {createUserMutation.isSuccess && (
              <Alert status="success" mt={5}>
                <AlertIcon />
                <AlertTitle mr={2}>Success:</AlertTitle>
                <AlertDescription>
                  User registered successfully! Please check your inbox for the
                  activation email.
                </AlertDescription>
              </Alert>
            )}

            {createUserMutation.isError && (
              <Alert status="error" mt={5}>
                <AlertIcon />
                <AlertTitle mr={2}>Error:</AlertTitle>
                <AlertDescription>
                  An error occurred: {createUserMutation.error.message}
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert status="error" mt={5}>
                <AlertIcon />
                <AlertTitle mr={2}>Error:</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <HStack mt={3}>
              <Text>Have an account already?</Text>
              <ChakraLink as={ReachLink} to="/login" color="blue.200">
                Please log in.
              </ChakraLink>
            </HStack>
          </SimpleGrid>
        </Box>
      </Flex>
    </Container>
  );
};

export default RegisterUserPage;
