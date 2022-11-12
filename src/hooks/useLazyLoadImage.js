import { useEffect, useState } from "react";

const placeHolder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";

const useLazyLoadImage = (src) => {
  const [imageSrc, setImageSrc] = useState(placeHolder);
  const [imageRef, setImageRef] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (imageRef && imageSrc !== src) {
      if (IntersectionObserver) {
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
                    setIsLoading(false);
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
      // on component cleanup, we remove the listner
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
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
