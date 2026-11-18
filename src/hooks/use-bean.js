import { useState } from "react";

export const useBean = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [category, setCategory] = useState("all");
  const [availability, setAvailability] = useState("all");

  const [sortOrder, setSortOrder] = useState("default");

  const [searchTerm, setSearchTerm] = useState("");

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

  return {
    products,
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
  };
};
