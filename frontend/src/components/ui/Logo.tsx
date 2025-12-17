import { Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Box>
      <Link to="/">
        <Image src="/logo.png" alt="Prodexa Logo" maxH="40px" w="auto" />
      </Link>
    </Box>
  );
};

export default Logo;
