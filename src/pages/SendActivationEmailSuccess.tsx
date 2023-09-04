import { AbsoluteCenter, Heading, SimpleGrid } from "@chakra-ui/react";

const SendActivationEmailSuccess = () => {
  return (
    <AbsoluteCenter>
      <SimpleGrid>
        <Heading>Success</Heading>
        <Heading as='h4' size='md'>Your activation was send. Plese check your inbox.</Heading>
      </SimpleGrid>
    </AbsoluteCenter>
  );
};

export default SendActivationEmailSuccess;
