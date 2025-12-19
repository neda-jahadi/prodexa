import { HStack, VStack, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const links = [
  { name: "Home", href: "/" },
  { name: "Create product", href: "/create" },
  { name: "Products", href: "/products" },
];

const MenuLinks = ({ isMobile = false }) => {
  const LinkComponent = isMobile ? VStack : HStack;

  return (
    <LinkComponent gap={isMobile ? 4 : 8} align="center">
      {links.map((link) => (
        <NavLink key={link.name} to={link.href}>
          {link.name}
        </NavLink>
      ))}

      <Button
        bg="black"
        color="white"
        size="sm"
        borderRadius="full"
        px={6}
        _hover={{
          transform: "translateY(-2px)",
          shadow: "lg",
        }}
        transition="all 0.2s ease"
      >
        Get Started
      </Button>
    </LinkComponent>
  );
};

export default MenuLinks;
