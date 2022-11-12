import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useAddProductToCartMutation } from "../../../services/productAPI";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Select,
  SimpleGrid,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProductDetailsForm({ productDetails, productId }) {
  const navigate = useNavigate();
  const [colorCode, setColorCode] = useState(null);
  const [storageCode, setStorageCode] = useState(null);
  const { isAddingToCart } = useSelector((state) => state.product);
  const [addProductsToCart] = useAddProductToCartMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addToCart = async () => {
    try {
      await addProductsToCart({ id: productId, colorCode, storageCode });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(addToCart)}
      style={{ width: "100%" }}
      id="form"
    >
      {productDetails && (
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
              <FormErrorMessage>{errors.color?.message}</FormErrorMessage>
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
              <FormErrorMessage>{errors.storage?.message}</FormErrorMessage>
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
  );
}

ProductDetailsForm.propTypes = {
  productDetails: PropTypes.object,
  productId: PropTypes.string,
};

export default ProductDetailsForm;
