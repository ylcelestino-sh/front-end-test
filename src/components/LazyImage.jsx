import React from "react";
import PropTypes from "prop-types";
import { Image, Spinner } from "@chakra-ui/react";
import useLazyLoadImage from "../hooks/useLazyLoadImage";
import { PLACEHOLDER } from "../constant/constant";

const LazyImage = ({ alt, src, rounded='lg', height=150, width=282, objectFit='contain' }) => {
  const { imageSrc, setImageRef, isLoading } = useLazyLoadImage(src);
  return (
    <>
        <Image
          data-testid="lazyImage"
          ref={setImageRef}
          src={imageSrc}
          alt={alt}
          rounded={rounded}
          height={height}
          width={width}
          objectFit={objectFit}
          fallbackSrc={PLACEHOLDER}
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
