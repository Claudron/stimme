import React, { useRef, useState } from "react";
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
import { Link as ReachLink, useNavigate } from "react-router-dom";
import { useResendActivationEmail } from "../hooks/useResendActivationEmail";
import apiClient from "../services/api-client";


const LoginPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [isUserInactive, setIsUserInactive] = useState(false);

  const navigate = useNavigate();
  const resendActivationEmail = useResendActivationEmail();

 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    

    const email = emailRef.current ? emailRef.current.value : "";
    const password = passwordRef.current ? passwordRef.current.value : "";
    const formData = { email, password };

    

    // Log the form data to the console
    console.log("Form data being sent:", formData);

    try {
      await apiClient.post("/auth/jwt/create/", formData);
      if (emailRef.current) emailRef.current.value = "";
      if (passwordRef.current) passwordRef.current.value = "";
      navigate("/posts");
      
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.detail) {
        let errorMessage = error.response.data.detail;

        if (
          error.response.data.detail ===
          "User is not active, please confirm your email"
        ) {
          setIsUserInactive(true);
        }

        if (
          errorMessage === "No active account found with the given credentials"
        ) {
          errorMessage = "The email or password is incorrect.";
        }

        setError(errorMessage);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const handleResendActivationEmail = () => {
    if (emailRef.current) {
      const email = emailRef.current.value;
      if (email) {
        resendActivationEmail.mutate({ email });
      } else {
        setError("Please enter an email address to resend the activation email.");
      }
    }
  };

  return (
    <Container justifyContent="center" alignItems="center">
  <Flex>
    <Box
      width="500px"
      padding={4}
      marginTop={5}
      borderColor="blackAlpha 50"
      borderWidth="1px"
      borderRadius={10}
    >
      <SimpleGrid padding={2}>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input 
              ref={emailRef} 
              type="email" 
              name="email" 
              autoComplete="email"   // Added autoComplete attribute
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              Password
              <ChakraLink
                as={ReachLink}
                to="/request/reset/password"
                color="blue.200"
                ml={2}
              >
                Forgot password?
              </ChakraLink>
            </FormLabel>
            <Input 
              ref={passwordRef} 
              type="password" 
              name="password" 
              autoComplete="current-password"  // Added autoComplete attribute
            />
          </FormControl>
          <Button type="submit" marginTop={5}>
            Login
          </Button>
          {error && (
            <Alert status="error" marginTop={5}>
              <AlertIcon />
              <AlertTitle mr={2}>Error:</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <HStack mt={3}>
            <Text>Don't have an account?</Text>
            <ChakraLink as={ReachLink} to="/register" color="blue.200">
              Please register.
            </ChakraLink>
          </HStack>
          {isUserInactive && (
            <>
              <Text marginTop={5}>
                Resend activation email for: {emailRef.current ? emailRef.current.value : ""} ?
              </Text>
              <Button onClick={handleResendActivationEmail} marginTop={5}>
                Resend
              </Button>
            </>
          )}
        </form>
      </SimpleGrid>
    </Box>
  </Flex>
</Container>

  );
};

export default LoginPage;
