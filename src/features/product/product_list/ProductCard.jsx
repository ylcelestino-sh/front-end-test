import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import LazyImage from "../../../components/LazyImage";

const ProductCard = ({ image, brand, model, price, id }) => {
  const navigate = useNavigate();
  return (
    <Center py={12} pb={2} data-testid="productCard">
      <Box
        role={"group"}
        p={2}
        maxW={"230px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        as="button"
        data-testid="productCardBox"
        onClick={() => navigate(`/product/${id}`)}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"130px"}
          _after={{
            transition: "all .5s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <LazyImage
            alt={model}
            src={image}
            rounded={"lg"}
            height={150}
            width={282}
            objectFit={"contain"}
          />
        </Box>
        <Stack pt={10}>
          <Heading as="h1" size="md">
            {model}
          </Heading>
          <Heading as="h2" size="md">
            ${price}
          </Heading>
          <Stack direction={"column"}>
            <Text fontWeight={100} fontSize={"sm"}>
              brand: {brand}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

ProductCard.propTypes = {
  image: PropTypes.string,
  brand: PropTypes.string,
  model: PropTypes.string,
  price: PropTypes.string,
  id: PropTypes.string,
};
export default ProductCard;
