import "./BeansPage.css";

import { ArrowLeft, ArrowRight, Pencil, Plus, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router";
import getProducts, { deleteProduct } from "../../service/productService";
import { useEffect, useState } from "react";

import { DeleteModal } from "../../components/ui/modal/DeleteModal";
import FiltreBar from "../../components/FiltreBar";
import NavBar from "../../components/NavBar";
import { ROUTES } from "../../constants";

const PRODUCTS_PER_PAGE = 6;

export const BeansPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  const [selectedProduct, setSelectedProduct] = useState(null);
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

  const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase("fr");
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = `${product.name} ${product.description}`
        .toLocaleLowerCase("fr")
        .includes(normalizedSearchTerm);
      const matchesCategory =
        category === "all" || product.Categorie === category;
      const hasStock = Number(product.stock) > 0;
      const matchesAvailability =
        availability === "all" ||
        (availability === "in-stock" && hasStock) ||
        (availability === "out-of-stock" && !hasStock);

      return matchesSearch && matchesCategory && matchesAvailability;
    })
    .sort((firstProduct, secondProduct) => {
      if (sortOrder === "price-asc") {
        return Number(firstProduct.price) - Number(secondProduct.price);
      }

      if (sortOrder === "price-desc") {
        return Number(secondProduct.price) - Number(firstProduct.price);
      }

      return 0;
    });
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  const handleDeleteClick = (product) => {
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
          <div className="bean-search">
            <label className="visually-hidden" htmlFor="bean-search-input">
              Rechercher un produit
            </label>
            <input
              id="bean-search-input"
              className="form-control bean-search-input"
              type="search"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </fiv>
        <div className="bean-catalog-layout">
          <FiltreBar
            category={category}
            availability={availability}
            sortOrder={sortOrder}
            onCategoryChange={(value) => {
              setCategory(value);
              setCurrentPage(1);
            }}
            onAvailabilityChange={(value) => {
              setAvailability(value);
              setCurrentPage(1);
            }}
            onSortOrderChange={(value) => {
              setSortOrder(value);
              setCurrentPage(1);
            }}
            onReset={() => {
              setCategory("all");
              setAvailability("all");
              setSortOrder("default");
              setCurrentPage(1);
            }}
          />
          <div className="bean-catalog-results">
            <div className="row gy-4 bean-product-grid">
              {currentProducts.map((product) => {
                console.log(product);

                return (
                  <div
                    className="relative col-12 col-sm-6 col-lg-4"
                    key={product.id}
                  >
                    <article className="bean-card">
                      <div className="absolute top-4 right-5 flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `${ROUTES.DASHBOARD.BEANS.EDIT}/${product.id}`,
                            )
                          }
                          className="text-slate-500 transition-colors hover:text-orange-600"
                          aria-label={`Modifier ${product.name}`}
                          title="Modifier le bean"
                        >
                          <Pencil
                            size={20}
                            className="text-success"
                            onClick={() => handleDeleteClick(product)}
                            aria-label={`Modifier ${product.name}`}
                            title={`Modifier ${product.name}`}
                          />
                        </button>

                        <button>
                          <Trash
                            size={20}
                            className="text-danger"
                            onClick={() => handleDeleteClick(product)}
                            aria-label={`Supprimer ${product.name}`}
                            title="Supprimer le produit"
                          />
                        </button>
                      </div>
                      <img
                        src={product.image}
                        className="bean-card-image"
                        alt={product.name}
                      />
                      <div className="bean-card-content">
                        <h2 className="bean-card-title">{product.name}</h2>
                        <p className="bean-card-description">
                          {product.description}
                        </p>
                        <p className="bean-card-price">
                          Prix : {product.price} Gallion
                        </p>
                      </div>
                      <p className="bean-card-stock">Stock : {product.stock}</p>
                    </article>
                  </div>
                );
              })}
            </div>
            {filteredProducts.length === 0 && (
              <p className="text-center mt-4">Aucun produit trouvé.</p>
            )}
            {totalPages > 1 && (
              <nav aria-label="Pagination des produits">
                <ul className="pagination justify-content-center mt-4">
                  <li
                    className={`page-item${currentPage === 1 ? " disabled" : ""}`}
                  >
                    <button
                      type="button"
                      className="page-link"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
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
                          onClick={() => setCurrentPage(page)}
                          aria-current={
                            currentPage === page ? "page" : undefined
                          }
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
                      onClick={() => setCurrentPage(currentPage + 1)}
                      aria-label="Page suivante"
                    >
                      Suivant
                    </button>
                  </li>
                </ul>
              </nav>
            )}
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
