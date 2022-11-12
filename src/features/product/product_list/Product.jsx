import React from "react";
import ProductCard from "./ProductCard";
import { FiSearch } from "react-icons/fi";
import { useGetProductsQuery } from "../../../services/productAPI";
import {
  Box,
  Center,
  SimpleGrid,
  Spinner,
  InputGroup,
  Input,
  InputRightElement,
  Flex,
  Divider,
  Text,
} from "@chakra-ui/react";
import useSearch from "../../../hooks/useSearch";

const Products = () => {
  
  const { data: products, isLoading } = useGetProductsQuery();
  const { elementsSearched, setSearchValue } = useSearch(products || []);

  return (
    <Box maxW="7xl" mx={"auto"} pt={12} px={{ base: 2, sm: 12, md: 1 }} mt={5}>
      <Flex
        maxW="100%"
        w={["90vw", "90vw"]}
        direction={["column", "row"]}
        justify="end"
      >
        <Flex mx={2}>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={"text"}
              placeholder="Search..."
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <InputRightElement width="3.5rem">
              <FiSearch color={"blue"} />
            </InputRightElement>
          </InputGroup>
        </Flex>
      </Flex>
      <Divider mt={1} mb={2} />
      {isLoading ? (
        <Center h="500px">
          <Spinner size="xl" />
        </Center>
      ) : elementsSearched.length === 0 ? (
        <Center h="500px">
          <Text fontSize="3xl">Oops no data found</Text>
        </Center>
      ) : (
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 2, lg: 7 }}>
          {elementsSearched.map((product, index) => {
            return (
              <ProductCard
                key={index}
                image={product.imgUrl}
                model={product.model}
                price={product.price}
                brand={product.brand}
                id={product.id}
              />
            );
          })}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Products;
