import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="custom-footer bg-dark text-white">
      <Container>
        <Row className="g-4 footer-content">
          {/* Help Section */}
          <Col md={3}>
            <h5 className="footer-title mb-4">Help & Support</h5>
            <ul className="footer-links">
              <li>
                <a href="/help-center">Help Center</a>
              </li>
              <li>
                <a href="/careers">Careers</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
              <li>
                <a href="/returns">Returns & Exchanges</a>
              </li>
            </ul>
          </Col>

          {/* Discover Section */}
          <Col md={3}>
            <h5 className="footer-title mb-4">Discover</h5>
            <ul className="footer-links">
              <li>
                <a href="/share">Share The Look</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/blog">Artisan Blog</a>
              </li>
              <li>
                <a href="/collections">Seasonal Collections</a>
              </li>
            </ul>
          </Col>

          {/* Contact Section */}
          <Col md={3}>
            <h5 className="footer-title mb-4">Our Studio</h5>
            <div className="contact-info">
              <p>VividHands Crafts Studio</p>
              <p>13927 South Gessner Road</p>
              <p>Mumbai 400001, India</p>
              <div className="business-hours mt-3">
                <p>Mon-Fri: 9AM - 6PM</p>
                <p>Sat: 10AM - 4PM</p>
              </div>
            </div>
          </Col>

          {/* Newsletter Section */}
          <Col md={3}>
            <h5 className="footer-title mb-4">Newsletter</h5>
            <Form className="newsletter-form">
              <Form.Group controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  className="mb-3"
                />
              </Form.Group>
              <Button variant="gold" className="w-100">
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Legal Section */}
        <Row className="legal-section mt-5 pt-4">
          <Col className="text-center">
            <div className="legal-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/accessibility">Accessibility</a>
              <a href="/do-not-sell">Do Not Sell</a>
            </div>
            <div className="copyright mt-3">
              <p>© {new Date().getFullYear()} VividHands Crafts Pvt. Ltd.</p>
              <p className="tagline">
                Handcrafted Artisanal Creations & Sustainable Crafts
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
