import { Eye, EyeOff } from "lucide-react";

import { useState } from "react";

export const AuthInput = ({
  name,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  register,
  validation,
  error,
  autoComplete,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={name}
          className="font-label-md text-label-md text-on-surface"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <Icon
            size={20}
            className="absolute left-3 text-secondary pointer-events-none"
          />
        )}

        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`w-full h-11 ${
            Icon ? "pl-11" : "pl-4"
          } ${isPassword ? "pr-11" : "pr-4"}
            bg-surface-container-lowest
            text-on-surface font-body-md rounded-lg shadow-sm
            placeholder:text-secondary
            focus:outline-none focus:ring-2 focus:ring-primary-container
            transition-all
            ${error ? "border border-red-500" : ""}
          `}
          {...(register ? register(name, validation) : {})}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((previous) => !previous)}
            aria-label={
              showPassword
                ? "Masquer le mot de passe"
                : "Afficher le mot de passe"
            }
            className="absolute right-3 text-secondary hover:text-on-surface"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {error && (
        <p id={`${name}-error`} className="text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};
