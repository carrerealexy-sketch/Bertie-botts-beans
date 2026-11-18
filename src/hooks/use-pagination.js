import { useState } from "react";

export const usePagination = (items = [], itemsPerPage = 6) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), Math.max(1, totalPages)));
  };

  const nextPage = () => goToPage(currentPage + 1);

  const previousPage = () => goToPage(currentPage - 1);

  const resetPage = () => setCurrentPage(1);

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    nextPage,
    previousPage,
    resetPage,
  };
};
