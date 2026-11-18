import "./AddBeanDashboard.css";

import { BeanForm } from "../../../components/form/BeanForm";
import { InputNumber } from "../../../components/ui/form/bean/inputNumber";
import { InputText } from "../../../components/ui/form/bean/inputText";
import { Link } from "react-router";
import NavBar from "../../../components/NavBar";
import { ROUTES } from "../../../constants";
import { Textarea } from "../../../components/ui/form/bean/Textarea";
import { addProduct } from "../../../service/productService";
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
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((currentProduct) => ({ ...currentProduct, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      await addProduct({
        ...product,
        name: product.name.trim(),
        description: product.description.trim(),
        price: Number(product.price),
        stock: Number(product.stock),
        image: product.image.trim(),
      });
      setProduct(INITIAL_PRODUCT);
      setFeedback({ type: "success", message: "Le produit a été ajouté." });
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
      <main className="add-bean-page">
        <section className="add-bean-card" aria-labelledby="add-bean-title">
          <Link className="add-bean-back" to={ROUTES.BEANS}>
            <span aria-hidden="true">←</span> Retour aux produits
          </Link>
          <header className="add-bean-header">
            <p className="add-bean-eyebrow">Catalogue</p>
            <h1 id="add-bean-title">Ajouter un produit</h1>
            <p>Renseignez les informations du nouveau produit.</p>
          </header>

          <BeanForm onSubmit={addProduct} submitLabel="Ajouter le produit" />
        </section>
      </main>
    </>
  );
};
