import React from "react";
import { Jumbotron } from "react-bootstrap";
import Layout from "../../components/Layout";
import { NavLink } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const Home = (props) => {
  return (
    <>
      <Layout sidebar>Wellcom</Layout>
      <h2 style={{ display: "block", margin: "40px" }}>Wellcom Admin page</h2>
    </>
  );
};
export default Home;
