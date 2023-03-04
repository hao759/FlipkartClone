import React from "react";
import { Nav, NavDropdown, Navbar, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
const Header = (props) => {
  return (
    <>
      <Navbar
        collapseOnSelect
        fixed="top"
        expand="lg"
        bg="dark"
        variant="dark"
        // style={{ zIndex: -99 }}
      >
        {/* <Container fluid> */}
        <Link to="/" className="navbar-brand">
          Admin Dashboard
        </Link>
        <Nav>
          {/* <Nav.Link href="#deets">Signin</Nav.Link> */}
          <li className="nav-item">
            <NavLink to="/signin" className="nav-link">
              Signin
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/signup" className="nav-link">
              Signup
            </NavLink>
          </li>
        </Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
        </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
    </>
  );
};
{
  /* {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()} */
}

export default Header;
