import { Box, Flex } from "@chakra-ui/react";
import Logo from "./ui/Logo";
import MenuLinks from "./ui/MenuLinks";
import MobileDrawer from "./ui/MobileDrawer";

const Navbar = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      gap={{ base: 8, lg: 16 }}
      px={{ base: 6, lg: 12 }}
      py={5}
      maxW={{ base: "full", xl: "1440px" }}
      mx="auto"
    >
      <Logo />

      {/* Desktop Menu */}
      <Box display={{ base: "none", md: "block" }}>
        <MenuLinks />
      </Box>

      {/* Mobile Drawer */}
      <Box display={{ base: "block", md: "none" }}>
        <MobileDrawer />
      </Box>
    </Flex>
  );
};

export default Navbar;
