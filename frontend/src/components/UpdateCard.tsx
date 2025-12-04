import { Button, CloseButton, Dialog, IconButton, Input, Portal, VStack } from "@chakra-ui/react";
import React from "react";
import { MdEdit } from "react-icons/md";
import { useProductStore } from "../store/product";
import { toaster } from "./ui/toaster";
interface ProductCardProps {
  product: Product;
}
interface Product {
  _id: string;
  name: string;
  price: string;
  image: string;
}

const UpdateCard = ({ product }: ProductCardProps) => {
  const { updateProduct } = useProductStore();
  const [updatedProduct, setUpdatedProduct] = React.useState(product);
  const [open, setOpen] = React.useState(false);

  const handleUpdateProduct = async () => {
    const result = await updateProduct(product._id, updatedProduct);
    let description = result.message;
    let type = result.success ? "success" : "error";

    toaster.create({
      description: description,
      type: type,
      closable: true,
      duration: 3000,
    });
  };

  return (
    <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <IconButton aria-label="Search database" colorPalette="green">
          <MdEdit />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Dialog Title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack display="flex" justifyContent="center" flex="1" width="100%" padding="24px">
                <Input
                  type="text"
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                  variant="outline"
                  value={updatedProduct.image}
                />
                <Input
                  type="text"
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                  variant="outline"
                  value={updatedProduct.name}
                />
                <Input
                  type="number"
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                  variant="outline"
                  value={updatedProduct.price}
                />
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button onClick={() => handleUpdateProduct()}>Update</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default UpdateCard;
