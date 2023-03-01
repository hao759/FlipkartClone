import React from "react";
// import { Jumbotron } from "react-bootstrap";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Layout from "../../components/Header";
const Signin = (props) => {
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form
            //  onSubmit={userLogin}
            >
              <Form.Control
                label="Email"
                placeholder="Email"
                // value={email}
                type="email"
                // onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control
                label="Password"
                placeholder="Password"
                // value={password}
                type="password"
                // onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
export default Signin;
