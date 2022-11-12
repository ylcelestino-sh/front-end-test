import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  Image,
  Select,
  SimpleGrid,
  Spinner,
  Table,
  TableContainer,
  Td,
  Text,
  Tr,
  Tbody,
  Collapse,
  useDisclosure,
  Stack,
  Heading,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import { useForm } from "react-hook-form";
import {
  useAddProductToCartMutation,
  useGetProductByIdQuery,
} from "../../services/productAPI";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [colorCode, setColorCode] = useState(null);
  const [storageCode, setStorageCode] = useState(null);
  const { isAddingToCart } = useSelector((state) => state.product);
  const { id } = useParams();
  const { data: productDetails, isLoading } = useGetProductByIdQuery(id);
  const [addProductsToCart] = useAddProductToCartMutation();
  const { isOpen, onToggle } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addToCart = async () => {
    try {
      await addProductsToCart({ id, colorCode, storageCode });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Center h="500px">
          <Spinner size="xl" />
        </Center>
      ) : (
        <Box p={4} display={{ md: "flex" }} mt={12}>
          <Box flexShrink={0}>
            <Image
              borderRadius="lg"
              boxSize="300px"
              objectFit="contain"
              display="flex"
              src={productDetails.imgUrl}
            />
          </Box>
          <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
            <Heading fontWeight="bold" letterSpacing="wide" color="teal.600">
              {productDetails.model}
            </Heading>
            <Divider mt="25px" mb="25px" />
            <Text fontWeight="bold" fontSize="40px" letterSpacing="wide">
              ${productDetails.price}
            </Text>
            <TableContainer>
              <Collapse
                in={isOpen}
                animateOpacity
                startingHeight={135}
                w="100%"
              >
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td>Brand</Td>
                      <Td>{productDetails.brand}</Td>
                    </Tr>
                    <Tr>
                      <Td>Model</Td>
                      <Td>{productDetails.model}</Td>
                    </Tr>
                    <Tr>
                      <Td>CPU</Td>
                      <Td>{productDetails.cpu}</Td>
                    </Tr>
                    <Tr>
                      <Td>RAM</Td>
                      <Td>{productDetails.ram}</Td>
                    </Tr>
                    <Tr>
                      <Td>Operating system</Td>
                      <Td>{productDetails.os}</Td>
                    </Tr>
                    <Tr>
                      <Td>Display resolution</Td>
                      <Td>{productDetails.displayResolution}</Td>
                    </Tr>
                    <Tr>
                      <Td>Battery</Td>
                      <Td>{productDetails.battery}</Td>
                    </Tr>
                    <Tr>
                      <Td>Camera</Td>
                      <Td>{productDetails.displaySize}</Td>
                    </Tr>
                    <Tr>
                      <Td>Dimensions</Td>
                      <Td>{productDetails.dimentions}</Td>
                    </Tr>
                    <Tr>
                      <Td>Weight</Td>
                      <Td>{productDetails.weight}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Collapse>
              <Stack direction={["column", "row"]} spacing="24px" justify="end">
                <Button
                  colorScheme="teal"
                  variant="link"
                  justifyItems="end"
                  rightIcon={isOpen ? <FiChevronUp /> : <FiChevronDown />}
                  mt="5"
                  onClick={onToggle}
                >
                  {!isOpen ? "Show more" : "Show less"}
                </Button>
              </Stack>
            </TableContainer>
            <Divider mt={5} mb={5} />
            <form
              onSubmit={handleSubmit(addToCart)}
              style={{ width: "100%" }}
              id="loginForm"
            >
              {productDetails.options && (
                <SimpleGrid columns={2} spacing="40px" mb={2}>
                  <FormControl isInvalid={!colorCode && errors.color}>
                    <Select
                      placeholder="Select color"
                      {...register("color", {
                        required: "Color is requiered",
                      })}
                      onChange={(event) => setColorCode(event.target.value)}
                    >
                      {productDetails.options.colors.map((color, index) => {
                        const { name, code } = color;
                        return (
                          <option key={index} value={code}>
                            {name}
                          </option>
                        );
                      })}
                    </Select>

                    {errors.color && (
                      <FormErrorMessage>
                        {errors.color?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={!storageCode && errors.storage}>
                    <Select
                      placeholder="Select storage"
                      {...register("storage", {
                        required: "Storage is requiered",
                      })}
                      onChange={(event) => setStorageCode(event.target.value)}
                    >
                      {productDetails.options.storages.map((storage, index) => {
                        const { name, code } = storage;
                        return (
                          <option key={index} value={code}>
                            {name}
                          </option>
                        );
                      })}
                    </Select>
                    {errors.storage && (
                      <FormErrorMessage>
                        {errors.storage?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </SimpleGrid>
              )}

              <Stack direction={["column", "row"]} spacing="24px" justify="end">
                <Button onClick={() => navigate("/product")}>Go Back</Button>

                <Button
                  colorScheme="teal"
                  type="submit"
                  leftIcon={
                    isAddingToCart && (
                      <Spinner
                        thickness="2px"
                        speed="0.75s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="md"
                      />
                    )
                  }
                >
                  Add to cart
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProductDetails;
