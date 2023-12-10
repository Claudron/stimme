import { Grid, GridItem, Box, Heading, VStack, Text} from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Grid
      templateRows="repeat(3, 100vh)" // Each row is 100% of the viewport height
      width="100vw"
      overflow="hidden"
      m={0}
      p={0}
    >
      {/* Hero Section */}
      {/* <GridItem>
        <Box
          height="80vh" // Reduce the height to allow the next section to come closer
          display="flex"
          flexDirection="column"
          justifyContent="center" // Vertically center the content within the hero section
          alignItems="center"
        >
          <Heading as="h1" size={["2xl", "3xl", "4xl"]} mb={4} textAlign="center">
            Eine Stimme die Köpfe dreht!
          </Heading>
          <Heading fontSize={["xl", "2xl", "3xl"]} mb={6} textAlign="center">
            Von den Grundlagen zur Meisterschaft: Professionelle Begleitung von
            den ersten Tönen bis zur Bühnenreife.
          </Heading>
        </Box>
        
      </GridItem> */}
      {/* Contact Section */}
      <GridItem >
        <Box
          height="80vh" // Full height for the contact section
          display="flex"
          flexDirection="column"
          justifyContent="center" // Vertically center the content
          alignItems="center"
        >
          <VStack spacing={4}>
            <Heading as="h1" size="2xl" mb={2} textAlign="center">
              Claudio Manzari
            </Heading>
            <Heading as="h2" size="xl" mb={2} textAlign="center">
              Stimmbildung
            </Heading>
            <Text fontSize="md" textAlign="center">
              Tel: +4917682404873
            </Text>
            <Text fontSize="md" textAlign="center">
              Email: stimme@manzarimusic.com
            </Text>
          </VStack>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default HomePage;
