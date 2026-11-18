import "./AddBeanDashboard.css";

import { Link, useNavigate, useParams } from "react-router";
import { getProductById, updateProduct } from "../../../service/productService";
import { useEffect, useState } from "react";

import { BeanForm } from "../../../components/form/BeanForm";
import NavBar from "../../../components/NavBar";
import { ROUTES } from "../../../constants";

export const EditBeanDashboardPage = () => {
  const { beanId } = useParams();
  const navigate = useNavigate();

  const [bean, setBean] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(beanId);
        setBean(product);
      } catch (error) {
        console.error(error);
        setError("Impossible de récupérer ce produit.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [beanId]);

  const handleSubmit = async (formData) => {
    await updateProduct(beanId, formData);
    navigate("/beans");
  };

  if (isLoading) {
    return (
      <>
        <NavBar />
        <div className="container mt-5 text-center">
          Chargement du produit...
        </div>
      </>
    );
  }

  if (!bean) {
    return (
      <>
        <NavBar />
        <div className="container mt-5">
          <p className="text-center text-danger">{error}</p>

          <div className="text-center">
            <Link to="/beans" className="btn btn-outline-secondary">
              Retour au catalogue
            </Link>
          </div>
        </div>
      </>
    );
  }

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

          <BeanForm
            initialData={bean}
            onSubmit={handleSubmit}
            submitLabel="Enregistrer les modifications"
          />
        </section>
      </main>
    </>
  );
};
