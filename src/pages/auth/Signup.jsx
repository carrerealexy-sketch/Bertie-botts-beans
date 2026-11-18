import { Button, Container, Form } from "react-bootstrap";

import { AuthContext } from "../../contexts/AuthContext";
import { ROUTES } from "../../constants";
import { signupValidation } from "../../validation/auth-validation";
import { use } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export const SignUp = () => {
  const { signup } = use(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (formData) => {
    const { password, name } = formData;

    const success = await signup({
      name,
      password,
    });

    if (success) {
      navigate(ROUTES.DASHBOARD.ROOT);
    } else {
      console.log("Erreur lors de l'inscription");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group className="mb-3">
          <Form.Label>Nom d'utilisateur</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrer votre nom"
            isInvalid={!!errors.username}
            {...register("username", signupValidation.name)}
          />

          <Form.Control.Feedback type="invalid">
            {errors.username?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Entrer votre mot de passe"
            isInvalid={!!errors.password}
            {...register("password", signupValidation.password)}
          />

          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirmer le mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirmer votre mot de passe"
            isInvalid={!!errors.confirmPassword}
            {...register(
              "confirmPassword",
              signupValidation.confirmPassword(getValues),
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit">Créer un compte</Button>
      </Form>
    </Container>
  );
};
