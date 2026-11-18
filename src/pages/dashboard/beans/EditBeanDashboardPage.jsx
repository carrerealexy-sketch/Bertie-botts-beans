import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { getProductById, updateProduct } from "../../../service/productService";
import { useEffect, useState } from "react";

import NavBar from "../../../components/NavBar";

export const EditBeanDashboardPage = () => {
  const { beanId } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    Categorie: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(beanId);

        setFormData({
          name: product.name ?? "",
          Categorie: product.Categorie ?? "",
          description: product.description ?? "",
          price: product.price ?? "",
          stock: product.stock ?? "",
          image: product.image ?? "",
        });
      } catch (error) {
        console.error(error);
        setError("Impossible de récupérer ce produit.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [beanId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsUpdating(true);
      setError("");

      await updateProduct(beanId, {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      });

      navigate("/beans");
    } catch (error) {
      console.error(error);
      setError("Impossible de modifier ce produit.");
    } finally {
      setIsUpdating(false);
    }
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

  if (error && !formData.name) {
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

      <main className="min-h-screen px-4 py-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
          {/* En-tête */}
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200/80 pb-5 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                <Link
                  to="/beans"
                  className="transition-colors hover:text-slate-900"
                >
                  Catalogue
                </Link>
                <span className="text-slate-300">/</span>
                <span className="font-semibold text-orange-600">
                  Modification
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Modifier un bean
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Modifiez les informations de votre produit.
              </p>
            </div>

            <Link
              to="/beans"
              className="inline-flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
            >
              <ArrowLeft size={15} />
              Retour au catalogue
            </Link>
          </div>

          {/* Formulaire */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-xs font-semibold text-slate-700"
                >
                  Nom du produit *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label
                  htmlFor="Categorie"
                  className="mb-1.5 block text-xs font-semibold text-slate-700"
                >
                  Catégorie *
                </label>
                <select
                  id="Categorie"
                  name="Categorie"
                  value={formData.Categorie}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="Beans">Beans</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-1.5 block text-xs font-semibold text-slate-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="w-full resize-none rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Prix et stock */}
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-5">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                Gestion des stocks et tarifs
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="price"
                    className="mb-1.5 block text-xs font-semibold text-slate-700"
                  >
                    Prix (Gallions) *
                  </label>
                  <div className="flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-orange-500">
                    <input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
                    />
                    <span className="text-xs font-medium text-slate-400">
                      Gal.
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="stock"
                    className="mb-1.5 block text-xs font-semibold text-slate-700"
                  >
                    Stock (unités) *
                  </label>
                  <div className="flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-orange-500">
                    <input
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      step="1"
                      value={formData.stock}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
                    />
                    <span className="text-xs font-medium text-slate-400">
                      unités
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div>
              <label
                htmlFor="image"
                className="mb-1.5 block text-xs font-semibold text-slate-700"
              >
                URL de l'image
              </label>
              <input
                id="image"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-500"
              />

              {formData.image && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold text-slate-500">
                    Aperçu du produit
                  </p>
                  <img
                    src={formData.image}
                    alt={formData.name}
                    className="h-28 w-28 rounded-lg border border-slate-200 bg-white object-contain"
                  />
                </div>
              )}
            </div>

            {error && (
              <p className="rounded-lg border border-rose-100 bg-rose-50 p-3 text-sm text-rose-700">
                {error}
              </p>
            )}

            {/* Actions */}
            <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-100 pt-5 sm:flex-row">
              <Link
                to="/beans"
                className="rounded-lg px-4 py-2.5 text-center text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
              >
                Annuler
              </Link>

              <button
                type="submit"
                disabled={isUpdating}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save size={15} />
                {isUpdating
                  ? "Enregistrement..."
                  : "Enregistrer les modifications"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
