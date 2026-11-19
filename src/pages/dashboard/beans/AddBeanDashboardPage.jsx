import "./AddBeanDashboard.css";

import { DashboardFormLayout } from "../../../layout/DashboardFormLayout";
import NavBar from "../../../components/NavBar";
import { ROUTES } from "../../../constants";
import { addProduct } from "../../../service/productService";
import { useNavigate } from "react-router";
import { useState } from "react";

const INITIAL_PRODUCT = {
  name: "",
  description: "",
  price: "",
  stock: "",
  Categorie: "Beans",
  image: "",
};

export const AddBeanDashboardPage = () => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (productData) => {
    setIsSubmitting(true);
    setFeedback(null);

    try {
      await addProduct(productData);

      setFeedback({
        type: "success",
        message: "Le produit a été ajouté.",
      });
      navigate(ROUTES.BEANS);
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue lors de l'ajout du produit.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NavBar />
      <DashboardFormLayout
        title="Ajouter un produit"
        description="Renseignez les informations du nouveau produit."
        onSubmit={handleSubmit}
        submitLabel="Ajouter le produit"
      />
    </>
  );
};
