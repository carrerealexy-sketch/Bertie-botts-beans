export const Pagination = ({
  totalPages,
  currentPage,
  previousPage,
  goToPage,
  nextPage,
}) => {
  return (
    <>
      {totalPages > 1 && (
        <nav aria-label="Pagination des produits">
          <ul className="pagination justify-content-center mt-4">
            <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
              <button
                type="button"
                className="page-link"
                disabled={currentPage === 1}
                onClick={previousPage}
                aria-label="Page précédente"
              >
                Précédent
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <li
                  className={`page-item${currentPage === page ? " active" : ""}`}
                  key={page}
                >
                  <button
                    type="button"
                    className="page-link"
                    onClick={() => goToPage(page)}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </button>
                </li>
              );
            })}
            <li
              className={`page-item${currentPage === totalPages ? " disabled" : ""}`}
            >
              <button
                type="button"
                className="page-link"
                disabled={currentPage === totalPages}
                onClick={nextPage}
                aria-label="Page suivante"
              >
                Suivant
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};
