import { HStack, VStack, Link, Button } from "@chakra-ui/react";

const links = [
  { name: "Home", href: "/" },
  { name: "Create product", href: "/create" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "#contact" },
];

const MenuLinks = ({ isMobile = false }) => {
  const LinkComponent = isMobile ? VStack : HStack;

  return (
    <LinkComponent gap={isMobile ? 4 : 8} align="center">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          fontWeight="medium"
          color="black"
          _hover={{
            color: "black",
            textDecoration: "underline",
          }}
          transition="color 0.2s ease"
        >
          {link.name}
        </Link>
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
