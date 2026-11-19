import { Pencil, Trash } from "lucide-react";

import { ROUTES } from "../../../constants";
import { useNavigate } from "react-router";

export const BeanCard = ({ bean, editOnClick, deleteOnClick }) => {
  const navigate = useNavigate();

  return (
    <div className="relative col-12 col-sm-6 col-lg-4" key={bean.id}>
      <article className="bean-card">
        <div className="absolute top-4 right-5 flex gap-2">
          <button
            type="button"
            onClick={() =>
              navigate(`${ROUTES.DASHBOARD.BEANS.EDIT}/${bean.id}`)
            }
            className="text-slate-500 transition-colors hover:text-orange-600"
            aria-label={`Modifier ${bean.name}`}
            title="Modifier le bean"
          >
            <Pencil
              size={20}
              className="text-success"
              onClick={() => editOnClick(bean)}
              aria-label={`Modifier ${bean.name}`}
              title={`Modifier ${bean.name}`}
            />
          </button>

          <button>
            <Trash
              size={20}
              className="text-danger"
              onClick={() => deleteOnClick(bean)}
              aria-label={`Supprimer ${bean.name}`}
              title="Supprimer le produit"
            />
          </button>
        </div>
        <img src={bean.image} className="bean-card-image" alt={bean.name} />
        <div className="bean-card-content">
          <h2 className="bean-card-title">{bean.name}</h2>
          <p className="bean-card-description">{bean.description}</p>
          <p className="bean-card-price">Prix : {bean.price} Gallion</p>
        </div>
        <p className="bean-card-stock">Stock : {bean.stock}</p>
      </article>
    </div>
  );
};
