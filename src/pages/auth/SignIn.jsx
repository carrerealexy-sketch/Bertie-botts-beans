import { Button, Col, Container, Row } from "react-bootstrap";

import { AuthContext } from "../../contexts/AuthContext";
import Form from "react-bootstrap/Form";
import { ROUTES } from "../../constants";
import { use } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";

export const SignIn = () => {
  const navigate = useNavigate();
  const { login } = use(AuthContext);

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
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupUsername">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Entrer votre nom"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Entrer un nom d'utilisateur"
                value={formData.password}
                onChange={handleChange}
              />
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
