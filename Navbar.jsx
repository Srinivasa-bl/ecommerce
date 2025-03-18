import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded} className="px-3 shadow-sm fixed-top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4" onClick={() => setExpanded(false)}>
          VividHands
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={() => setExpanded(false)}>About</Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={() => setExpanded(false)}>Contact</Nav.Link>
            <NavDropdown title="Products" id="products-dropdown">
              <NavDropdown.Item as={Link} to="/products/electronics" onClick={() => setExpanded(false)}>Electronics</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products/books" onClick={() => setExpanded(false)}>Books</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/products/all" onClick={() => setExpanded(false)}>All Products</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex me-3 d-none d-lg-flex">
            <FormControl type="search" placeholder="Search" className="me-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
          <Nav>
            <Nav.Link as={Link} to="/cart" className="mx-2" onClick={() => setExpanded(false)}>🛒 Cart</Nav.Link>
            <Nav.Link as={Link} to="/auth" className="mx-2" onClick={() => setExpanded(false)}>Auth</Nav.Link> {/* ✅ Single Auth Component */}
            <Nav.Link as={Link} to="/seller-login" className="mx-2" onClick={() => setExpanded(false)}>Seller Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

