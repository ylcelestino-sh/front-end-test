import React, { useEffect, useState } from 'react';
import { Button, Center } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Pagination = ({elementsPerPage, totalElements, paginate, currentPage}) => {
  const [pageNumbers, setPageNumbers] = useState([]);
  const [isCurrentPage, setIsCurrentPage] = useState(null);
  const totalPage = Math.ceil(totalElements / elementsPerPage);

  useEffect(() => { // TODO: implement custom hook
    const pageNumbersEffectList = [];
    setPageNumbers([]);
    for (let index = 1; index <= totalPage; index++) {
        pageNumbersEffectList.push(index);
    }
    setPageNumbers([...pageNumbersEffectList]);
    setIsCurrentPage(currentPage);
  }, [totalElements, totalPage, currentPage]);

  return (
    <Center justifyItems={'center'} gap={2} mb="10" mt="5">
      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          onClick={() => paginate(pageNumber)}
          colorScheme={isCurrentPage === pageNumber ? 'blue' : 'gray'}
        >
          {pageNumber}
        </Button>
      ))}
    </Center>
  );
};

Pagination.propTypes = {
    elementsPerPage: PropTypes.number,
    totalElements: PropTypes.number,
    currentPage: PropTypes.number,
    paginate: PropTypes.func
  };

export default Pagination;