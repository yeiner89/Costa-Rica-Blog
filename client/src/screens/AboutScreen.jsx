import { Box, Text, Image } from "@chakra-ui/react";

const AboutScreen = () => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Image src="/images/about.jpeg" alt="Lovely Image" maxH="550px" minW="300px" objectFit="cover" flex="1" />
      <Text mt={4} fontSize="xl">
        Yeiner Aparicio
      </Text>
      <Text mt={4} fontSize="xl">
        I have a deep passion for capturing the beauty of sunrise through photography and my approach to life is to
        savor each day as if it were the last.
      </Text>
      <Text mt={4} fontSize="xl">
        “If you want to make beautiful music, you must play the black and the white notes together.”
      </Text>
    </Box>
  );
};

export default AboutScreen;
