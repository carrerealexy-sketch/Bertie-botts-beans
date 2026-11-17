import { Button, Col, Container, Row } from "react-bootstrap";

import Form from "react-bootstrap/Form";

export const SignIn = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupUsername">
              <Form.Label>Nom d'utilisateur</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer un nom d'utilisateur"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrer un nom d'utilisateur"
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
