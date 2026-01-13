import React from "react";
import { useProductStore } from "../store/product";
import { Box, Container, SimpleGrid, Text } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const products = useProductStore((state) => state.products);
  const getProducts = useProductStore((state) => state.getProducts);

  React.useEffect(() => {
    getProducts();
  }, [getProducts]);

  const productsView = products.length > 0 && (
    <SimpleGrid columns={[1, 2, 3]} gap="24px">
      {products.map((product) => (
        <Link key={product._id} to={product._id}>
          <ProductCard product={product} />
        </Link>
      ))}
    </SimpleGrid>
  );

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

export default ProductsPage;
