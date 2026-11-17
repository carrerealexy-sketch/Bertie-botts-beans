import { Button, Col, Container, Row } from "react-bootstrap";
import { useContext, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import Form from "react-bootstrap/Form";

export const SignIn = () => {
  const { login } = useContext(AuthContext);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupUsername">
              <Form.Label>Nom d'utilisateur</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Entrer un nom d'utilisateur"
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
