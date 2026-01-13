import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import type { ProductDetailsResponse } from "../types/product";

const ProductDetails = () => {
  const { data: productDetails } = useLoaderData() as ProductDetailsResponse;

  return (
    <Box py={5}>
      <Image
        src={productDetails.image}
        alt={productDetails.name}
        h={48}
        w="full"
        objectFit="contain"
      />
      <Box>
        <Heading as={"h3"} size={"md"} mb={"2"}>
          {productDetails.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} mb={2}>
          {productDetails.price}
        </Text>
      </Box>
    </Box>
  );
};

export default ProductDetails;

export const productDetailsLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  if (!id) {
    throw new Response("Missing product id", { status: 400 });
  }
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) {
    throw new Response("Failed to fetch product", { status: res.status });
  }
  const result = (await res.json()) as ProductDetailsResponse;
  if (!result.success) {
    throw new Response("Product not found", { status: 404 });
  }
  return result;
};
