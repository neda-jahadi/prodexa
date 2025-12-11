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
    <Container maxW="5xl" marginBlock={"4"}>
      {products.length !== 0 ? (
        <Text as="h1" textStyle="4xl" fontWeight="bold" textAlign={"left"}>
          Current Products
        </Text>
      ) : (
        <Box>
          No products found
          <Link to="/create">Create one</Link>
        </Box>
      )}
      {products.length > 0 && (
        <Flex justify="space-between" marginTop={"10"} marginBottom={"3"}>
          <Text>{products.length} products</Text>
          <Filter />
        </Flex>
      )}
      <Box>{products.length > 0 && productsView}</Box>
    </Container>
  );
};

export default HomePage;
