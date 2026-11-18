import "./BeansPage.css";

import getProducts, { deleteProduct } from "../../service/productService";
import { useEffect, useState } from "react";

import { BeanCard } from "../../components/ui/card/bean-card";
import { DeleteModal } from "../../components/ui/modal/DeleteModal";
import FiltreBar from "../../components/FiltreBar";
import { Link } from "react-router";
import NavBar from "../../components/NavBar";
import { Pagination } from "../../components/ui/pagination/pagination";
import { Plus } from "lucide-react";
import { ROUTES } from "../../constants";
import { SearchInput } from "../../components/ui/form/search-input";
import { useBean } from "../../hooks/use-bean";
import { usePagination } from "../../hooks/use-pagination";

export const BeansPage = () => {
  const {
    setProducts,
    selectedProduct,
    setSelectedProduct,
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    availability,
    setAvailability,
    sortOrder,
    setSortOrder,
    filteredProducts,
  } = useBean();

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits", error);
      }
    };

    fetchProducts();
  }, []);

  const {
    currentPage,
    totalPages,
    currentItems: currentProducts,
    resetPage,
    goToPage,
    nextPage,
    previousPage,
  } = usePagination(filteredProducts, 6);

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteError("");
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setDeleteError("");
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProduct) return;

    try {
      setIsDeleting(true);
      setDeleteError("");

      await deleteProduct(selectedProduct.id);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== selectedProduct.id),
      );

      setSelectedProduct(null);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      setDeleteError("Impossible de supprimer ce produit.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <fiv className="flex justify-end gap-2 mb-4">
          <Link
            to={ROUTES.DASHBOARD.BEANS.ADD}
            className="btn btn-primary flex items-center justify-center gap-2"
          >
            <Plus />
          </Link>

          <SearchInput
            htmlFor="bean-search-input"
            id="bean-search-input"
            label="Rechercher un produit"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              resetPage();
            }}
          />
        </fiv>

        <div className="bean-catalog-layout">
          <FiltreBar
            category={category}
            availability={availability}
            sortOrder={sortOrder}
            onCategoryChange={(value) => {
              setCategory(value);
              resetPage();
            }}
            onAvailabilityChange={(value) => {
              setAvailability(value);
              resetPage();
            }}
            onSortOrderChange={(value) => {
              setSortOrder(value);
              resetPage();
            }}
            onReset={() => {
              setCategory("all");
              setAvailability("all");
              setSortOrder("default");
              resetPage();
            }}
          />
          <div className="bean-catalog-results">
            <div className="row gy-4 bean-product-grid">
              {currentProducts.map((bean) => (
                <BeanCard
                  bean={bean}
                  deleteOnClick={handleDeleteClick}
                  editOnClick={handleEditClick}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <p className="text-center mt-4">Aucun produit trouvé.</p>
            )}

            <Pagination
              currentPage={currentPage}
              goToPage={goToPage}
              nextPage={nextPage}
              previousPage={previousPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        title="Supprimer ce produit ?"
        description="Cette action est irréversible. Êtes-vous sûr de vouloir continuer ?"
        confirmLabel="Oui, supprimer"
      >
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm text-slate-600">
          Produit :{" "}
          <strong className="text-slate-800">{selectedProduct?.name}</strong>
        </div>

        {deleteError && (
          <p className="mt-4 p-3 rounded-lg bg-rose-50 border border-rose-100 text-sm text-rose-700">
            {deleteError}
          </p>
        )}
      </DeleteModal>
    </>
  );
};
