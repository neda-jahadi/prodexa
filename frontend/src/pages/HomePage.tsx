import React from "react";
import { Box, Container, Text, SimpleGrid, Flex } from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import Filter from "../components/Filter";

const HomePage = () => {
  const products = useProductStore((state) => state.products);
  const getProducts = useProductStore((state) => state.getProducts);

  React.useEffect(() => {
    getProducts();
  }, [getProducts]);

  const productsView = products.length > 0 && (
    <SimpleGrid columns={[1, 2, 3]} gap="24px">
      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </SimpleGrid>
  );

  React.useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Container maxW="5xl" marginBlock={"4"} textAlign={"left"}>
      <Box marginBottom={"4"}>
        <Text as="h1" textStyle="4xl" fontWeight="bold" textAlign={"left"}>
          {products.length !== 0 ? "Current Products" : "No products found"}
        </Text>
      </Box>
      <Filter />

      {products.length > 0 && (
        <Box>
          <Text textStyle="m" fontWeight="light" textAlign={"right"} marginBottom={"5"}>
            {products.length} products
          </Text>
          {productsView}
        </Box>
      )}
    </Container>
  );
};

export default HomePage;
