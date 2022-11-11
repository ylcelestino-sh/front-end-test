import { useState } from 'react';

const usePaginationControl = (numberOfProductsPerPage = 8) => {

    const [currentPage, setCurrentPage] = useState(1);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Get current products
    const indexOfLastItem = currentPage * numberOfProductsPerPage;
    const indexOfFirstItem = indexOfLastItem - numberOfProductsPerPage;

    return {
        paginate,
        currentPage,
        indexOfLastItem,
        indexOfFirstItem,
        numberOfProductsPerPage
    }
}

export default usePaginationControl;
