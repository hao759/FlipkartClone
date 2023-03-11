import React from "react";
import { Jumbotron } from "react-bootstrap";
import Layout from "../../components/Layout";
import { NavLink } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const Home = (props) => {
  return (
    <>
      <Layout>Wellcom</Layout>
      <h2 style={{ display: "block", margin: "40px" }}>Wellcom Admin page</h2>
      <Container fluid>
        <Row>
          <Col md={2} className="sidebar">
            <ul>
              <li>
                <NavLink exact to={`/`}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={`/page`}>Page</NavLink>
              </li>
              <li>
                <NavLink to={`/category`}>Category</NavLink>
              </li>
              <li>
                <NavLink to={`/products`}>Products</NavLink>
              </li>
              <li>
                <NavLink to={`/orders`}>Orders</NavLink>
              </li>
            </ul>
          </Col>
          <Col md={10} style={{ marginLeft: "auto", paddingTop: "60px" }}>
            {props.children}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Home;
