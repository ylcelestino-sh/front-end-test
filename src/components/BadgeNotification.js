import React from 'react'
import PropTypes from "prop-types";
import { FiShoppingCart } from 'react-icons/fi';

import { Box, Button } from '@chakra-ui/react';

const BadgeNotification = ({itemsNumbers = 0}) => {
  return (
    <Button py={"2"} aria-label={"Notifications"} variant="ghost">
    <>
      <FiShoppingCart />
      <Box
        as={"span"}
        color={"white"}
        position={"absolute"}
        top={"6px"}
        right={"4px"}
        w="30%"
        fontSize={"0.8rem"}
        bgColor={"red"}
        borderRadius="3xl"
        zIndex={9999}
        p={"1px"}
        variant="ghost"
      >
        {itemsNumbers}
      </Box>
    </>
  </Button>
  )
}

BadgeNotification.propTypes = {
    itemsNumbers: PropTypes.number
}
export default BadgeNotification;
