import "./FiltreBar.css";

import { FilterItem } from "./ui/filter/filter-item";

function FiltreBar({
  category,
  availability,
  sortOrder,
  onCategoryChange,
  onAvailabilityChange,
  onSortOrderChange,
  onReset,
}) {
  const categories = [
    { key: "all", label: "Toutes les catégories" },
    { key: "Boîte", label: "Boîte" },
    { key: "Beans", label: "Beans" },
  ];

  const availabilities = [
    { key: "all", label: "Toutes les disponibilités" },
    { key: "in-stock", label: "En stock" },
    { key: "out-of-stock", label: "Épuisé" },
  ];

  const sortOrders = [
    { key: "default", label: "Ordre par défaut" },
    { key: "price-asc", label: "Prix croissant" },
    { key: "price-desc", label: "Prix décroissant" },
  ];

  return (
    <aside className="filter-bar" aria-label="Filtres des produits">
      <h2 className="filter-bar-title">Filtres</h2>

      <fieldset className="filter-bar-section">
        <legend className="filter-bar-heading">Catégorie</legend>

        <div className="filter-bar-options">
          {categories.map((categoryItem) => (
            <FilterItem
              label={categoryItem.label}
              name="product-category"
              value={categoryItem.key}
              checked={category === categoryItem.key}
              onChange={() => onCategoryChange(categoryItem.key)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="filter-bar-section">
        <legend className="filter-bar-heading">Disponibilité</legend>
        <div className="filter-bar-options">
          {availabilities.map((availabilityItem) => (
            <FilterItem
              label={availabilityItem.label}
              name="product-availability"
              value={availabilityItem.key}
              checked={availability === availabilityItem.key}
              onChange={() => onAvailabilityChange(availabilityItem.key)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="filter-bar-section">
        <legend className="filter-bar-heading">Trier par</legend>
        <div className="filter-bar-options">
          {sortOrders.map((sortOrderItem) => (
            <FilterItem
              label={sortOrderItem.label}
              name="product-sort"
              value={sortOrderItem.key}
              checked={sortOrder === sortOrderItem.key}
              onChange={() => onSortOrderChange(sortOrderItem.key)}
            />
          ))}
        </div>
      </fieldset>

      <button className="filter-bar-reset" type="button" onClick={onReset}>
        Réinitialiser les filtres
      </button>
    </aside>
  );
}

export default FiltreBar;
