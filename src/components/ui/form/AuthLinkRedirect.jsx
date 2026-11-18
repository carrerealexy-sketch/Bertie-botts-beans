import { Link } from "react-router";

export const AuthLinkRedirect = ({ message, label, to }) => {
  return (
    <div className="mt-6 pt-4 flex flex-col items-center justify-center text-center gap-2">
      <p className="font-body-md text-secondary">
        {message}

        <Link
          to={to}
          className="font-label-lg text-primary-container hover:text-on-primary-fixed-variant font-semibold transition-colors ml-1"
        >
          {label}
        </Link>
      </p>
    </div>
  );
};
