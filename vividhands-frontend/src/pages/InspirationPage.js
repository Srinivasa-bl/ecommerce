import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Carousel,
  Button,
  Modal,
  Pagination,
  Form,
  InputGroup,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Globe, Search, SortAlphaDown, SortNumericDown } from "react-bootstrap-icons";
import "./InspirationPage.css";

import image1 from "./assets/1.jpeg";
import image2 from "./assets/2.jpeg";
import image4 from "./assets/4.jpeg";
import image5 from "./assets/5.jpeg";
import image6 from "./assets/6.jpeg";
import image7 from "./assets/7.jpeg";
import image8 from "./assets/8.jpeg";
import image9 from "./assets/9.jpeg";

function InspirationPage() {
  const artisanStories = [
    {
      name: "Mira Devi",
      image: image1,
      country: "India",
      craft: "Textile Block Printing",
      products: ["Scarves", "Table Runners", "Wall Hangings"],
      social: "@MiraDeviCrafts",
      quote: "Each stitch tells the story of my ancestors.",
      story: "Mira, a textile artist from Rajasthan, revives centuries-old block printing techniques and empowers women artisans through sustainable textile cooperatives.",
      years: 15,
    },
    {
      name: "Juan Carlos",
      image: image2,
      country: "Peru",
      craft: "Alpaca Wool Weaving",
      products: ["Tapestries", "Blankets", "Ponchos"],
      social: "@AndeanWeaves",
      quote: "We weave the spirit of the Andes into every thread.",
      story: "Juan, a master weaver in Cusco, preserves ancient Inca patterns while innovating with natural dyes from local plants.",
      years: 22,
    },
    {
      name: "Aiko Nakamura",
      image: image4,
      country: "Japan",
      craft: "Kintsugi Restoration",
      products: ["Ceramics", "Workshop Kits", "Art Pieces"],
      social: "@GoldenSeams",
      quote: "Imperfection is the soul of handmade beauty.",
      story: "Aiko teaches Kintsugi (golden repair) across Japan, transforming broken ceramics into philosophical art pieces.",
      years: 12,
    },
    {
      name: "Kwame Adu",
      image: image5,
      country: "Ghana",
      craft: "Recycled Glass Beads",
      products: ["Jewelry", "Decor", "Art Installations"],
      social: "@KroboBeads",
      quote: "Our beads are more than ornaments – they're storytellers.",
      story: "Kwame's collective creates vibrant beads from recycled glass using traditional Krobo techniques passed down through generations.",
      years: 18,
    },
    {
      name: "Elena Petrova",
      image: image6,
      country: "Bulgaria",
      craft: "Folklore Embroidery",
      products: ["Costumes", "Textile Art", "Accessories"],
      social: "@BalkanThreads",
      quote: "Preserving tradition in every embroidery thread.",
      story: "Elena's workshop revives nearly extinct Bulgarian embroidery patterns through collaborations with museum archives.",
      years: 9,
    },
    {
      name: "Fatima Al-Hassan",
      image: image7,
      country: "Morocco",
      craft: "Berber Rug Weaving",
      products: ["Rugs", "Cushions", "Wall Hangings"],
      social: "@AtlasWoolWorks",
      quote: "Colors of my culture live through my fingers.",
      story: "Fatima leads a women's cooperative creating rugs using ancestral Berber symbols and locally-sourced wool.",
      years: 14,
    },
    {
      name: "Liam O'Reilly",
      image: image8,
      country: "Ireland",
      craft: "Celtic Woodcarving",
      products: ["Furniture", "Decor", "Jewelry"],
      social: "@OakAndLegend",
      quote: "Wood holds the whispers of Celtic myths.",
      story: "Liam specializes in Ogham script carvings, creating modern heirlooms that connect to Ireland's druidic past.",
      years: 7,
    },
    {
      name: "Zara Al-Masri",
      image: image9,
      country: "Syria",
      craft: "Traditional Pottery",
      products: ["Tableware", "Decorative Pieces", "Sculptures"],
      social: "@DamascusClay",
      quote: "Clay connects my past with the future.",
      story: "Zara combines ancient Syrian pottery techniques with contemporary designs, working with war-affected women artisans.",
      years: 11,
    },
  ];

  const countries = ['All', ...new Set(artisanStories.map(a => a.country))];
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loadingImages, setLoadingImages] = useState(true);
  const [paginationOpen, setPaginationOpen] = useState(false);

  const filteredArtisans = artisanStories
    .filter(a =>
      (selectedCountry === 'All' || a.country === selectedCountry) &&
      (a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.craft.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.story.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'years-desc') return b.years - a.years;
      if (sortBy === 'years-asc') return a.years - b.years;
      return 0;
    });

  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredArtisans.length / itemsPerPage);
  const paginatedArtisans = filteredArtisans.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedArtisan, setSelectedArtisan] = useState(null);

  const handleShowModal = (artisan) => {
    setSelectedArtisan(artisan);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setSubscribed(true);
      setEmail('');
    }, 1000);
  };

  const shareOnSocial = (platform, artisan) => {
    const message = encodeURIComponent(
      `Discover ${artisan.name}'s ${artisan.craft} from ${artisan.country}: "${artisan.quote}"`
    );
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${message}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
      instagram: `https://www.instagram.com/${artisan.social}`
    };
    window.open(urls[platform], '_blank');
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoadingImages(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="inspiration-page">
      {loadingImages ? (
        <div className="carousel-loading">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Carousel
          fade
          className="quote-carousel"
          interval={6000}
          touch
          pause={false}
          aria-label="Artisan quotes carousel"
        >
          {artisanStories.map((artisan, index) => (
            <Carousel.Item key={index}>
              <div className="position-relative h-100">
                <img
                  className="d-block w-100 carousel-img"
                  src={artisan.image}
                  alt={artisan.name}
                  loading="lazy"
                />
                <Carousel.Caption>
                  <h3 className="text-uppercase">
                    {artisan.name} — {artisan.country}
                  </h3>
                  <p className="fst-italic fs-5 text-light">“{artisan.quote}”</p>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      <Container className="py-4 filter-controls">
        <Row className="g-3">
          <Col md={3}>
            <InputGroup>
              <InputGroup.Text><Search /></InputGroup.Text>
              <Form.Control
                placeholder="Search artisans..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setActivePage(1);
                }}
              />
            </InputGroup>
          </Col>
          <Col md={3}>
            <InputGroup>
              <InputGroup.Text><Globe /></InputGroup.Text>
              <Form.Select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setActivePage(1);
                }}
              >
                {countries.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </Form.Select>
            </InputGroup>
          </Col>
          <Col md={3}>
            <InputGroup>
              <InputGroup.Text>
                {sortBy.includes('years') ? <SortNumericDown /> : <SortAlphaDown />}
              </InputGroup.Text>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Sort By</option>
                <option value="name">Name (A-Z)</option>
                <option value="years-desc">Experience (High-Low)</option>
                <option value="years-asc">Experience (Low-High)</option>
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>
      </Container>

      <Container className="py-5">
        {loadingImages ? (
          <Row className="gy-5">
            {[...Array(3)].map((_, index) => (
              <Col md={6} lg={4} key={index}>
                <Card className="h-100 placeholder-glow">
                  <div className="card-img-top placeholder" style={{ height: '300px' }} />
                  <Card.Body>
                    <h5 className="card-title placeholder col-8"></h5>
                    <p className="card-text placeholder col-10"></p>
                    <Button disabled variant="outline-primary" className="placeholder col-6"></Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Row className="gy-5">
            {paginatedArtisans.map((artisan, index) => (
              <Col md={6} lg={4} key={index}>
                <Card className="h-100 shadow-lg artisan-card animated-card">
                  <Card.Img
                    variant="top"
                    src={artisan.image}
                    className="artisan-img"
                    loading="lazy"
                  />
                  <Card.Body>
                    <Card.Title className="text-center fw-bold">
                      {artisan.name} ({artisan.country})
                    </Card.Title>
                    <blockquote className="blockquote text-center fst-italic text-secondary">
                      “{artisan.quote}”
                    </blockquote>
                    <div className="text-center mt-3">
                      <Button
                        variant="outline-primary"
                        onClick={() => handleShowModal(artisan)}
                      >
                        Discover More
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <div className="pagination-container">
          <button
            className={`pagination-toggle ${paginationOpen ? 'hidden' : ''}`}
            onClick={() => setPaginationOpen(true)}
            aria-label="Show pagination controls"
          >
            Page Navigation
          </button>

          <div className={`pagination-controls ${!paginationOpen ? 'collapsed' : ''}`}>
            <Pagination>
              <Pagination.Prev
                disabled={activePage === 1}
                onClick={() => setActivePage(activePage - 1)}
              />
              {[...Array(totalPages)].map((_, idx) => (
                <Pagination.Item
                  key={idx}
                  active={idx + 1 === activePage}
                  onClick={() => {
                    setActivePage(idx + 1);
                    setPaginationOpen(false);
                  }}
                >
                  {idx + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={activePage === totalPages}
                onClick={() => setActivePage(activePage + 1)}
              />
            </Pagination>
            <Button
              variant="link"
              className="close-pagination"
              onClick={() => setPaginationOpen(false)}
              aria-label="Close pagination"
            >
              &times;
            </Button>
          </div>
        </div>

        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedArtisan?.name}'s Story</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedArtisan?.image}
              alt={selectedArtisan?.name}
              className="img-fluid rounded mb-3"
            />
            <div className="d-flex justify-content-between mb-2">
              <h5 className="text-muted">{selectedArtisan?.country}</h5>
              <span className="text-primary">Crafting for {selectedArtisan?.years} years</span>
            </div>
            <p><strong>Specialty:</strong> {selectedArtisan?.craft}</p>
            <p className="fst-italic">“{selectedArtisan?.quote}”</p>
            <p>{selectedArtisan?.story}</p>
            <p><strong>Products:</strong> {selectedArtisan?.products?.join(', ')}</p>
            <div className="social-links mt-4">
              <Button variant="outline-dark" onClick={() => shareOnSocial('twitter', selectedArtisan)}>
                <i className="bi bi-twitter"></i> Twitter
              </Button>
              <Button variant="outline-primary" onClick={() => shareOnSocial('facebook', selectedArtisan)}>
                <i className="bi bi-facebook"></i> Facebook
              </Button>
              <Button variant="outline-danger" onClick={() => shareOnSocial('instagram', selectedArtisan)}>
                <i className="bi bi-instagram"></i> Instagram
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        <div className="newsletter-section mt-5">
          <h3 className="text-center mb-4">Stay Inspired</h3>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              {subscribed ? (
                <Alert variant="success" className="text-center">
                  Thank you for subscribing! You'll receive our monthly artisan highlights.
                </Alert>
              ) : (
                <Form onSubmit={handleSubscribe}>
                  <InputGroup>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email for artisan updates"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button variant="primary" type="submit">
                      Subscribe
                    </Button>
                  </InputGroup>
                  <Form.Text className="text-muted">
                    We'll never share your email. Unsubscribe anytime.
                  </Form.Text>
                </Form>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default InspirationPage;