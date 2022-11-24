import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function useSearch({ elements, searchValue = "", propertyOfSearch }) {
  const [elementsSearched, setElementsSearched] = useState(elements || []);

  const handleElementsSearched =  () => {
    return elements.filter((element) => {
      return element[`${propertyOfSearch}`]
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase());
    });
  };

  useEffect(() => {
    if (elements && elements.length !== 0) {
      if (searchValue === "") {
        setElementsSearched(elements || []);
      } else {
        setElementsSearched(handleElementsSearched());
      }
    }
  }, [searchValue, elements]);

  return { elementsSearched };
}

useSearch.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.object),
};

export default useSearch;
