import React from "react";
import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { CiSquarePlus } from "react-icons/ci";
import { FaRegSun, FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [colorMode, toggleColorMode] = React.useState(false);
  return (
    <Container maxW="5xl" px="4" borderBottomWidth="1px" marginBottom={"4"}>
      <Flex h="16" direction={{ base: "column", sm: "row" }} align="center" justify="space-between">
        <Text fontWeight="extrabold">
          <Link to="/">Product Store</Link>
        </Text>
        <HStack>
          <Link to="/create">
            <Button>
              <CiSquarePlus />
            </Button>
          </Link>
          <Button onClick={() => toggleColorMode(!colorMode)}>
            {colorMode ? <FaRegSun /> : <FaMoon />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
