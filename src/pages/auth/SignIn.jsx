import { BadgeCheck, Lock, UserRound } from "lucide-react";

import { AuthContext } from "../../contexts/AuthContext";
import { AuthFormHeader } from "../../components/ui/form/auth-form-header";
import { AuthInput } from "../../components/ui/form/auth-input";
import { AuthLinkRedirect } from "../../components/ui/form/AuthLinkRedirect";
import { FormButton } from "../../components/ui/form/FormButton";
import { ROUTES } from "../../constants";
import { signinValidation } from "../../validation/auth-validation";
import { use } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export const SignIn = () => {
  const navigate = useNavigate();
  const { login } = use(AuthContext);

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

    if (success) {
      navigate(ROUTES.DASHBOARD.ROOT);
    } else {
      console.log("Identifiants incorrects");
    }
  };

  return (
    <div className="relative w-full max-w-[440px] flex flex-col items-center rounded-2xl">
      <div className="bg-white w-full bg-surface-container-lowest rounded-xl shadow-sm p-6 flex flex-col">
        <AuthFormHeader title="Connection" />

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
            Entrer dans l'Atelier
          </FormButton>
        </form>

        <AuthLinkRedirect
          message="Pas encore d'accès ?"
          label="Créer un compte"
          to={ROUTES.AUTH.REGISTER}
        />
      </div>

      <div className="mt-4 flex items-center gap-2 text-secondary font-label-sm select-none text-center">
        <BadgeCheck />
        <span>Authentification certifiée</span>
      </div>
    </div>
  );
};
