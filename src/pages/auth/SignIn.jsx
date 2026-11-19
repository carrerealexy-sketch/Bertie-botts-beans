import { Lock, UserRound } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router";

import { AuthContext } from "../../contexts/AuthContext";
import { AuthFormHeader } from "../../components/ui/form/auth-form-header";
import { AuthInput } from "../../components/ui/form/auth-input";
import { AuthLinkRedirect } from "../../components/ui/form/AuthLinkRedirect";
import { FormButton } from "../../components/ui/form/FormButton";
import { ROUTES } from "../../constants";
import { signinValidation } from "../../validation/auth-validation";
import { use } from "react";
import { useForm } from "react-hook-form";

export const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, connectedUser } = use(AuthContext);

  const redirectTo = location.state?.from?.pathname || ROUTES.BEANS;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const onSubmit = async (formData) => {
    const success = await login(formData);

    const redirectTo =
      location.state?.from?.pathname ||
      sessionStorage.getItem("previousPage") ||
      ROUTES.BEANS;

    if (success) {
      navigate(redirectTo, { replace: true });
    } else {
      console.log("Identifiants incorrects");
    }
  };

  if (connectedUser) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <div className="relative w-full max-w-[440px] flex flex-col items-center rounded-2xl">
      <div className="bg-white w-full bg-surface-container-lowest rounded-xl shadow-sm p-6 flex flex-col">
        <AuthFormHeader title="Connexion" />

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <AuthInput
            name="name"
            label="Nom"
            placeholder="Entrer votre nom"
            icon={UserRound}
            register={register}
            validation={signinValidation.name}
            error={errors.name}
          />

          <AuthInput
            name="password"
            label="Mot de passe"
            type="password"
            icon={Lock}
            register={register}
            validation={signinValidation.password}
            error={errors.password}
          />

          <FormButton
            loading={isSubmitting}
            loadingText="Ouverture du grimoire..."
          >
            Se connecter
          </FormButton>
        </form>

        <AuthLinkRedirect
          message="Pas encore d'accès ?"
          label="Créer un compte"
          to={ROUTES.AUTH.REGISTER}
        />
      </div>
    </div>
  );
};
