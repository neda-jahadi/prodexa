import {
  Button,
  CheckboxCard,
  CheckboxGroup,
  CloseButton,
  Drawer,
  Flex,
  IconButton,
  Portal,
  RadioCard,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { IoFilterOutline } from "react-icons/io5";
import { useProductStore } from "../store/product";

const Filter = () => {
  const [filters, setFilters] = React.useState<string>("");
  const getProducts = useProductStore((state) => state.getProducts);

  // const handleFilterProducts = (values: string[]) => {
  //   setFilters(values);
  //   getProducts(filters);
  // };

  const items = [
    { value: "name-asc", title: "NAME (A-Z)" },
    { value: "name-desc", title: "NAME (Z-A)" },
    { value: "price-asc", title: "LÄGST PRIS" },
    { value: "price-desc", title: "HÖGST PRIS" },
  ];

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <IconButton variant="ghost" padding={"3"}>
          Filter
          <IoFilterOutline />
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>All filters</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <RadioCard.Root onValueChange={(e) => console.log(e.value)}>
                <RadioCard.Label>Sorting</RadioCard.Label>
                <VStack align="stretch">
                  {items.map((item) => (
                    <RadioCard.Item key={item.value} value={item.value}>
                      <RadioCard.ItemHiddenInput />
                      <RadioCard.ItemControl>
                        <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                        <RadioCard.ItemIndicator />
                      </RadioCard.ItemControl>
                    </RadioCard.Item>
                  ))}
                </VStack>
              </RadioCard.Root>
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline">Cancel</Button>
              <Button>SHOW</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default Filter;
