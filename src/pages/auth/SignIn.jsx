import { Button, Col, Container, Row } from "react-bootstrap";
import {
  signinValidation,
  signupValidation,
} from "../../validation/auth-validation";

import { AuthContext } from "../../contexts/AuthContext";
import Form from "react-bootstrap/Form";
import { ROUTES } from "../../constants";
import { use } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export const SignIn = () => {
  const navigate = useNavigate();
  const { login } = use(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
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
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-3" controlId="formGroupUsername">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer votre nom"
                isInvalid={!!errors.username}
                {...register("username", signinValidation.name)}
              />

              <Form.Control.Feedback type="invalid">
                {errors.username?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrer votre mot de passe"
                isInvalid={!!errors.password}
                {...register("password", signinValidation.password)}
              />

              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Se connecter
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
