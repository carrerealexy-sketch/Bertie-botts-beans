import { InputNumber } from "../ui/form/bean/inputNumber";
import { InputText } from "../ui/form/bean/inputText";
import { Textarea } from "../ui/form/bean/Textarea";
import { useState } from "react";

const INITIAL_PRODUCT = {
  name: "",
  description: "",
  price: "",
  stock: "",
  Categorie: "Beans",
  image: "",
};

export const BeanForm = ({
  initialData = INITIAL_PRODUCT,
  onSubmit,
  submitLabel = "Enregistrer",
}) => {
  const [product, setProduct] = useState(() => ({
    ...INITIAL_PRODUCT,
    ...initialData,
  }));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProduct((currentProduct) => ({
      ...currentProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setFeedback(null);

    try {
      await onSubmit({
        ...product,
        name: product.name.trim(),
        description: product.description.trim(),
        price: Number(product.price),
        stock: Number(product.stock),
        image: product.image.trim(),
      });

      setFeedback({
        type: "success",
        message: "Le produit a été enregistré.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue lors de l'enregistrement.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="add-bean-form" onSubmit={handleSubmit}>
      <InputText
        label="Nom"
        htmlFor="product-name"
        id="product-name"
        name="name"
        type="text"
        value={product.name}
        onChange={handleChange}
        required
      />

      <InputText
        label="URL de l'image"
        htmlFor="product-image"
        id="product-image"
        name="image"
        type="url"
        value={product.image}
        onChange={handleChange}
        required
        className="add-bean-field add-bean-field-image"
      />

      <Textarea
        label="Description"
        htmlFor="product-description"
        id="product-description"
        name="description"
        value={product.description}
        onChange={handleChange}
        required
      />

      <InputNumber
        label="Prix (Gallions)"
        htmlFor="product-price"
        id="product-price"
        name="price"
        min="0"
        step="0.01"
        value={product.price}
        onChange={handleChange}
      />

      <InputNumber
        label="Stock"
        htmlFor="product-stock"
        id="product-stock"
        name="stock"
        min="0"
        step="1"
        value={product.stock}
        onChange={handleChange}
      />

      <div className="add-bean-field">
        <label className="form-label" htmlFor="product-category">
          Catégorie
        </label>

        <select
          className="form-select"
          id="product-category"
          name="Categorie"
          value={product.Categorie}
          onChange={handleChange}
          required
        >
          <option value="Beans">Beans</option>
          <option value="Boîte">Boîte</option>
        </select>
      </div>

      {feedback && (
        <p
          className={`add-bean-feedback ${
            feedback.type === "success" ? "is-success" : "is-error"
          }`}
          role={feedback.type === "success" ? "status" : "alert"}
        >
          {feedback.message}
        </p>
      )}

      <div className="add-bean-form-actions">
        <button
          className="add-bean-submit"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enregistrement…" : submitLabel}
        </button>
      </div>
    </form>
  );
};
