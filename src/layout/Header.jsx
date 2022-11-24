import React from "react";
import BadgeNotification from "../components/BadgeNotification";
import { FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Stack,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
} from "@chakra-ui/react";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { countProductInCart } = useSelector((state) => state.product);

  return (
    <Box overflow="hidden" position="fixed" top="0" width="100%" zIndex="999" id="header">
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Stack
          flex={{ base: 2, md: 1 }}
          justify={"flex-start"}
          direction={"row"}
          spacing={2}
        >
          <Breadcrumb separator={<FiChevronRight color="gray.500" />}>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate("/products")}>
                Products
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathname.split("/")[1] === "product" && (
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>Product Detail</BreadcrumbLink>
              </BreadcrumbItem>
            )}
          </Breadcrumb>
        </Stack>
        <BadgeNotification itemsNumbers={countProductInCart} />
      </Flex>
    </Box>
  );
};

export default Header;
