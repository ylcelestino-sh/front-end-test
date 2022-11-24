import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../../services/productAPI";
import ProductDetailsTable from "./ProductDetailsTable";
import ProductDetailsForm from "./ProductDetailsForm";
import {
  Box,
  Center,
  Divider,
  Image,
  Spinner,
  Text,
  Heading,
} from "@chakra-ui/react";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: productDetails, isLoading } = useGetProductByIdQuery(id);

  return (
    <>
      {isLoading ? (
        <Center h="500px">
          <Spinner size="xl" />
        </Center>
      ) : (
        <Box p={4} display={{ md: "flex" }} mt={12} data-testid="productDetails">
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
            <ProductDetailsTable productDetails={productDetails} />
            <Divider mt={5} mb={5} />
            <ProductDetailsForm
              productId={id}
              productDetails={productDetails}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProductDetails;
