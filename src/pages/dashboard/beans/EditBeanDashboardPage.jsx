import "./AddBeanDashboard.css";

import { Link, useNavigate, useParams } from "react-router";
import { getProductById, updateProduct } from "../../../service/productService";
import { useEffect, useState } from "react";

import { DashboardFormLayout } from "../../../layout/DashboardFormLayout";
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
    navigate(ROUTES.BEANS);
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
      <DashboardFormLayout
        title="Modifier un produit"
        description="Renseignez les informations pour modifier le produit."
        onSubmit={handleSubmit}
        submitLabel="Enregistrer les modifications"
        initialData={bean}
      />
    </>
  );
};
