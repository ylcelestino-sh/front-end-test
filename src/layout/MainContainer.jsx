import React from "react";
import PropTypes from "prop-types";
import { Container } from "@chakra-ui/react";
import Header from "./Header";

export const MainContainer = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxW="container.lg" pt={3}  id="container">
        {children}
      </Container>
    </>
  );
};

MainContainer.propTypes = {
  children: PropTypes.node,
};

export default MainContainer;
