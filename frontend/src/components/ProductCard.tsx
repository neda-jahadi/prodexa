import { Box, HStack, Image, Text, Heading, IconButton } from "@chakra-ui/react";
import { toaster } from "../components/ui/toaster";

import { useProductStore } from "../store/product";
import { RiDeleteBin6Line } from "react-icons/ri";
import UpdateCard from "./UpdateCard";
interface ProductCardProps {
  product: Product;
}
interface Product {
  _id: string;
  name: string;
  price: string;
  image: string;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { deleteProduct } = useProductStore();

  const handleDeleteProduct = async (id: string) => {
    const resultDeleteProduct = await deleteProduct(id);
    let description = resultDeleteProduct.message;
    let type = resultDeleteProduct.success ? "success" : "error";

    toaster.create({
      description: description,
      type: type,
      closable: true,
      duration: 3000,
    });
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      padding={3}
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image src={product.image} alt={product.name} h={48} w="full" objectFit="contain" />
      <Box>
        <Heading as={"h3"} size={"md"} mb={"2"}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} mb={2} display="flex">
          {product.price}
        </Text>
        <HStack gap="3">
          <IconButton
            aria-label="Search database"
            colorPalette="red"
            onClick={() => handleDeleteProduct(product._id)}
          >
            <RiDeleteBin6Line />
          </IconButton>

          <UpdateCard product={product} />
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
