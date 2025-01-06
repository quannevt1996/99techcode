import { Box, Flex } from "@chakra-ui/react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Converter from "./pages/converter";

export const Layout = () => {
  return (
    <Box margin="0 auto" maxWidth={800} transition="0.5s ease-out">
      <Flex wrap="wrap" margin="8" minHeight="90vh">
        <Header />
        <Box width="full" as="main" marginY={22}>
          <Converter />
        </Box>
        <Footer />
      </Flex>
    </Box>
  );
};
