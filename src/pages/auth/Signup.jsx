import { Button, Container, Form } from "react-bootstrap";
import { useContext, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { ROUTES } from "../../constants";
import { useNavigate } from "react-router";

export const SignUp = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await signup(formData);

    if (success) {
      navigate(ROUTES.DASHBOARD.ROOT);
    } else {
      console.log("Erreur lors de l'inscription");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nom d'utilisateur</Form.Label>
          <Form.Control
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit">Créer un compte</Button>
      </Form>
    </Container>
  );
};
