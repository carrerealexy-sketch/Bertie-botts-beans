import { BeanForm } from "../components/form/BeanForm";
import { Link } from "react-router";
import { ROUTES } from "../constants";

export const DashboardFormLayout = ({
  title,
  description,
  onSubmit,
  submitLabel,
  initialData,
}) => {
  return (
    <main className="add-bean-page">
      <section className="add-bean-card" aria-labelledby="add-bean-title">
        <Link className="add-bean-back" to={ROUTES.BEANS}>
          <span aria-hidden="true">←</span> Retour aux produits
        </Link>

        <header className="add-bean-header">
          <p className="add-bean-eyebrow">Catalogue</p>
          <h1 id="add-bean-title">{title}</h1>
          <p>{description}</p>
        </header>

        <BeanForm
          initialData={initialData}
          onSubmit={onSubmit}
          submitLabel={submitLabel}
        />
      </section>
    </main>
  );
};
