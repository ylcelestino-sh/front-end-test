import { useEffect, useState } from "react";
import { PLACEHOLDER } from "../constant/constant";

const useLazyLoadImage = (src) => {
  const [imageSrc, setImageSrc] = useState(PLACEHOLDER);
  const [imageRef, setImageRef] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let observer;
    let didCancel = false;

    if(!src || src.length === 0) {
      didCancel = true; 
    }

    if (imageRef && imageSrc !== src) {
      if (window.IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setIsLoading(true);

                setTimeout(() => {
                  setImageSrc(src);
                }, 1000);

                observer.unobserve(imageRef);
              }
            });
          },
          {
            root: null,
            threshold: 0.01,
            rootMargin: "0px",
          }
        );
        observer.observe(imageRef);
      } else {
        // Old browsers fallback

        setImageSrc(src);
      }
    }

    return () => {
      didCancel = true;
      // on component cleanup, remove the listner
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
        setIsLoading(false);
      }
    };
  }, [src, imageSrc, imageRef]);

  return {
    setImageRef,
    imageSrc,
    isLoading,
  };
};

export default useLazyLoadImage;
