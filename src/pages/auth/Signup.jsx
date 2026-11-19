import { Lock, UserRound } from "lucide-react";

import { AuthContext } from "../../contexts/AuthContext";
import { AuthFormHeader } from "../../components/ui/form/auth-form-header";
import { AuthInput } from "../../components/ui/form/auth-input";
import { AuthLinkRedirect } from "../../components/ui/form/AuthLinkRedirect";
import { FormButton } from "../../components/ui/form/FormButton";
import { PasswordStrength } from "../../components/ui/form/PasswordStrength";
import { ROUTES } from "../../constants";
import { signupValidation } from "../../validation/auth-validation";
import { use } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = use(AuthContext);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (formData) => {
    const { name, password } = formData;

    const success = await signup({
      name,
      password,
    });

    if (success) {
      navigate(ROUTES.BEANS);
    } else {
      console.log("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="relative w-full max-w-[440px] flex flex-col items-center rounded-2xl">
      <div className="bg-white w-full bg-surface-container-lowest rounded-xl shadow-sm p-6 flex flex-col">
        <AuthFormHeader title="Créer un compte" />

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <AuthInput
            name="name"
            label="Nom d'utilisateur"
            placeholder="Entrer votre nom"
            icon={UserRound}
            register={register}
            validation={signupValidation.name}
            error={errors.name}
          />

          <AuthInput
            name="password"
            label="Mot de passe"
            type="password"
            icon={Lock}
            register={register}
            validation={signupValidation.password}
            error={errors.password}
          />

          <AuthInput
            name="confirmPassword"
            label="Confirmer le mot de passe"
            type="password"
            icon={Lock}
            register={register}
            validation={signupValidation.confirmPassword(getValues)}
            error={errors.confirmPassword}
          />

          <PasswordStrength password={password} />

          <FormButton
            loading={isSubmitting}
            loadingText="Création de votre compte..."
          >
            Créer mon compte
          </FormButton>
        </form>

        <AuthLinkRedirect
          message="Déjà un accès ?"
          label="Se connecter"
          to={ROUTES.AUTH.LOGIN}
        />
      </div>
    </div>
  );
};
