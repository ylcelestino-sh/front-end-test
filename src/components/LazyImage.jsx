import React from "react";
import PropTypes from "prop-types";
import { Image, Spinner } from "@chakra-ui/react";
import useLazyLoadImage from "../hooks/useLazyLoadImage";

const LazyImage = ({ alt, src, rounded, height, width, objectFit }) => {
  const { imageSrc, setImageRef, isLoading } = useLazyLoadImage(src);
  return (
    <>
        <Image
          ref={setImageRef}
          src={imageSrc}
          alt={alt}
          rounded={rounded}
          height={height}
          width={width}
          objectFit={objectFit}
        />
      {
        isLoading ? <Spinner /> : null
      }
    </>
  );
};

LazyImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  rounded: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  objectFit: PropTypes.string,
};

export default LazyImage;
