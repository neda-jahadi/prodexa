import React from "react";
import { Box, Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

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
    <Container maxW="5xl">
      <VStack>
        <Text textStyle="2xl" fontWeight="bold">
          Current Products
        </Text>
        <Box>{products.length > 0 ? productsView : <Text>No products found</Text>}</Box>
      </VStack>
      <Box></Box>
    </Container>
  );
};

export default HomePage;
