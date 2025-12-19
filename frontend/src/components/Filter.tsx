import React from "react";
import {
  Accordion,
  Button,
  CloseButton,
  Drawer,
  IconButton,
  Portal,
  RadioCard,
  Slider,
  Span,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IoFilterOutline } from "react-icons/io5";
import { useProductStore } from "../store/product";

const Filter = () => {
  const sortItems = [
    { value: "name-asc", title: "NAME (A-Z)" },
    { value: "name-desc", title: "NAME (Z-A)" },
    { value: "price-asc", title: "LÄGST PRIS" },
    { value: "price-desc", title: "HÖGST PRIS" },
  ];

  const [sortValue, setSortValue] = React.useState<string>("name-asc");
  const [priceValue, setPriceValue] = React.useState<number[]>([0, 5000]);

  const getProducts = useProductStore((state) => state.getProducts);
  const products = useProductStore((state) => state.products);

  const handleSortProducts = () => {
    getProducts(sortValue, priceValue);
  };

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <IconButton variant="subtle" padding={"3"}>
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
              <Accordion.Root collapsible>
                <Accordion.Item value="sorting">
                  <Accordion.ItemTrigger>
                    <Span flex="1">Sorting</Span>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody>
                      <RadioCard.Root
                        defaultValue="name-asc"
                        onValueChange={(e) => {
                          setSortValue(e.value ?? "name-asc");
                          getProducts(e.value ?? "name-asc", priceValue);
                        }}
                      >
                        <VStack align="stretch">
                          {sortItems.map((item) => (
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
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              </Accordion.Root>

              <Accordion.Root collapsible>
                <Accordion.Item value="price">
                  <Accordion.ItemTrigger>
                    <Span flex="1">Price</Span>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody>
                      <Text textAlign="right">
                        {priceValue[0]} - {priceValue[1]}
                      </Text>
                      <Slider.Root
                        value={priceValue}
                        min={0}
                        max={5000}
                        onValueChange={(e) => {
                          setPriceValue(e.value);
                          getProducts(sortValue, e.value);
                        }}
                      >
                        <Slider.Control>
                          <Slider.Track>
                            <Slider.Range />
                          </Slider.Track>
                          <Slider.Thumbs />
                        </Slider.Control>
                      </Slider.Root>
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              </Accordion.Root>
            </Drawer.Body>
            <Drawer.Footer>
              <Drawer.CloseTrigger position={"static"} asChild>
                <Button variant="outline">Cancel</Button>
              </Drawer.CloseTrigger>
              <Drawer.CloseTrigger position={"static"} asChild>
                <Button onClick={handleSortProducts}>SHOW {products.length}</Button>
              </Drawer.CloseTrigger>
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
