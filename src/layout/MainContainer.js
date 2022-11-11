import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { FiChevronLeft } from 'react-icons/fi';

import { useLocation, useNavigate } from 'react-router-dom';
import BadgeNotification from "../components/BadgeNotification";
import {
  Box,
  Flex,
  Stack,
  useColorModeValue,
  Container,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
} from '@chakra-ui/react';

export const MainContainer = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { countProductInCart } = useSelector((state) => state.product);
 
  return (
    <>
      <Box overflow="hidden" position="fixed" top="0" width="100%" zIndex="999">
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
            <Breadcrumb separator={<FiChevronLeft color="gray.500" /> }>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigate("/product")}>
                  Products
                </BreadcrumbLink>
              </BreadcrumbItem>
              {pathname.split("/")[1] === "product" && (
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>Products Detail</BreadcrumbLink>
                </BreadcrumbItem>
              )}
            </Breadcrumb>
          </Stack>

          <BadgeNotification itemsNumbers={countProductInCart} />
        </Flex>
      </Box>
      <Container maxW="container.lg" pt={3}>
        {children}
      </Container>
    </>
  );
};

MainContainer.propTypes = {
  children: PropTypes.node,
};
export default MainContainer;
