import React from "react";
import PropTypes from "prop-types";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  Button,
  Collapse,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
  useDisclosure
} from "@chakra-ui/react";

import './productDetailsStyle.css';

const  ProductDetailsTable = ({ productDetails }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <TableContainer className="table__container">
      <Collapse in={isOpen} animateOpacity startingHeight={135} w="100%">
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th className="table__title">Brand</Th>
              <Td className="table__content">{productDetails.brand}</Td>
            </Tr>
            <Tr>
              <Th className="table__title">Model</Th>
              <Td className="table__content">{productDetails.model}</Td>
            </Tr>
            <Tr>
              <Th className="table__title">CPU</Th>
              <Td className="table__content">{productDetails.cpu}</Td>
            </Tr>
            <Tr>
              <Th className="table__title">RAM</Th>
              <Td className="table__content">{productDetails.ram}</Td>
            </Tr>
            <Tr>
              <Th className="table__title">Operating system</Th>
              <Td className="table__content">{productDetails.os}</Td>
            </Tr>
            <Tr>
              <Th className="table__title">Display resolution</Th>
              <Td className="table__content">{productDetails.displayResolution}</Td>
            </Tr>
            <Tr>
              <Th className="table__title">Battery</Th>
              <Td className="table__content">{productDetails.battery}</Td>
            </Tr>
            <Tr>
              <Th className="table__title">Camera</Th>
              <Td className="table__content">{productDetails.displaySize}</Td>
            </Tr>
            {productDetails.dimentions!== '-' && <Tr>
              <Th className="table__title">Dimensions</Th>
              <Td className="table__content">{productDetails.dimentions}</Td>
            </Tr>}
            {productDetails.weight!== '' && <Tr>
              <Th className="table__title">Weight</Th>
              <Td className="table__content">{productDetails.weight}&apos;</Td>
            </Tr>}
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
  );
}

ProductDetailsTable.propTypes = {
  productDetails: PropTypes.object,
};

export default ProductDetailsTable;
