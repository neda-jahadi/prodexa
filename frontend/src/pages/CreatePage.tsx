import React from "react";
import { Box, Button, Container, Heading, Input } from "@chakra-ui/react";
import { toaster } from "../components/ui/toaster";

import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = React.useState({ name: "", price: "", image: "" });

  const { createProduct } = useProductStore();

  const addNewProduct = async () => {
    const res = await createProduct(newProduct);
    if (res.success) {
      toaster.create({
        description: res.message,
        type: "success",
        closable: true,
        duration: 3000,
      });
      setNewProduct({ name: "", price: "", image: "" });
    } else {
      toaster.create({
        description: res.message,
        type: "error",
        closable: true,
        duration: 3000,
      });
    }
  };

  return (
    <Container maxW="md">
      <Heading fontSize={"3xl"} mb={4} fontWeight={"bold"}>
        Create new product
      </Heading>
      <Box
        p="4"
        rounded="md"
        borderWidth="1px"
        borderColor={"gray.300"}
        display="flex"
        flexDirection={"column"}
        gap={2}
        shadow={"md"}
      >
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={newProduct.name}
          variant="outline"
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <Input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          variant="outline"
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <Input
          type="text"
          name="image"
          placeholder="Image"
          value={newProduct.image}
          variant="outline"
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <Button onClick={() => addNewProduct()}>Add new Product</Button>
      </Box>
    </Container>
  );
};

export default CreatePage;
