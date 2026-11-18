import { ArrowRight } from "lucide-react";

export const FormButton = ({
  children,
  loading = false,
  loadingText = "Chargement...",
  type = "submit",
  disabled = false,
  icon: Icon = ArrowRight,
  showIcon = true,
  className = "",
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`w-full h-11 mt-1 bg-primary hover:bg-on-primary-fixed-variant text-white font-label-lg rounded-xl shadow-sm hover:shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <span className="font-semibold tracking-wide">
        {loading ? loadingText : children}
      </span>

      {!loading && showIcon && <Icon size={20} className="ml-1" />}
    </button>
  );
};
