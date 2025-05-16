import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaMedal,
  FaClock,
  FaComments,
  FaShieldAlt,
  FaGlobe,
  FaWallet,
  FaTruck,
  FaChartLine,
  FaHandshake,
  FaRocket,
  FaUsers,
  FaGraduationCap,
  FaHandHoldingHeart,
  FaQuoteLeft // Ensure this is included
} from "react-icons/fa";
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Playfair Display', serif;
    background: ${props => props.colors.light};
  }

  h1, h2, h3 {
    font-family: 'Cinzel', serif;
    letter-spacing: 0.05em;
  }
`;

const LuxuryContainer = styled.div`
  background: ${props => props.colors.light};
`;

const HeroSection = styled.section`
  background: ${props => props.colors.gradient};
  padding: 8rem 0;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.05) 100%);
    pointer-events: none;
  }
`;

const ArtisanResponsibilities = () => {
  const navigate = useNavigate();
  const [calculatorInput, setCalculatorInput] = useState({ price: "", quantity: "" });

  // Enhanced Color Scheme
  const colors = {
    primary: "#2A2D34",
    secondary: "#F4B942",
    accent: "#7D8CC4",
    light: "#F8F9FA",
    dark: "#1A1C22",
    ecoGreen: "#6ABD8C",
    gradient: `linear-gradient(135deg, #2A2D34 0%, #7D8CC4 100%)`,
  };

  // Consolidated Data Structures
  const artisanData = {
    responsibilities: [
      { icon: <FaMedal />, title: "Quality Standards", text: "Maintain exceptional craftsmanship" },
      { icon: <FaClock />, title: "Timely Fulfillment", text: "3-5 day processing time" },
      { icon: <FaComments />, title: "Communication", text: "24h response time" },
      { icon: <FaShieldAlt />, title: "Material Integrity", text: "Authentic materials only" },
    ],
    perks: [
      { icon: <FaGlobe />, title: "Global Reach", text: "Access international markets" },
      { icon: <FaWallet />, title: "85% Commission", text: "Industry-leading rates" },
      { icon: <FaTruck />, title: "Logistics Support", text: "Shipping & packaging help" },
      { icon: <FaChartLine />, title: "Analytics", text: "Real-time sales insights" },
    ],
    platformBenefits: [
      { icon: <FaUsers />, title: "Community", text: "10,000+ artisan network" },
      { icon: <FaRocket />, title: "Marketing", text: "AI-powered promotions" },
      { icon: <FaGraduationCap />, title: "Workshops", text: "Monthly skill-building sessions" },
      { icon: <FaHandHoldingHeart />, title: "Insurance", text: "Product protection guarantee" },
    ],
    interactive: {
      progressSteps: [
        { title: "Create Profile", done: true },
        { title: "Add Products", done: false },
        { title: "Start Selling", done: false },
      ],
      testimonials: [
        { name: "Maria, Weaver", text: "Tripled my income while preserving traditional techniques" },
        { name: "Ahmed, Potter", text: "Found global clients for my ceramic art" },
      ]
    }
  };

  // Enhanced Earnings Calculator with error handling
  const calculateEarnings = () => {
    const price = parseFloat(calculatorInput.price) || 0;
    const quantity = parseInt(calculatorInput.quantity) || 0;
    return (price * quantity * 0.85).toFixed(2);
  };

  // Slider Settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false
        }
      }
    ]
  };

  return (
    <LuxuryContainer className="container-fluid px-0" colors={colors}>
      <GlobalStyle colors={colors} />

      {/* Hero Section */}
      <HeroSection colors={colors}>
        <div className="container">
          <h1 className="display-3 fw-bold text-white mb-4">
            <FaHandshake className="me-3 float-animation" />
            Artisan Partnership Program
          </h1>
          <p className="lead text-light mb-5 mx-auto" style={{ maxWidth: "800px" }}>
            Elevate your craft with premium tools, global exposure, and fair compensation
          </p>

          <div className="row g-4">
            <BenefitCardGrid
              title="Your Benefits"
              items={artisanData.perks}
              color={colors.secondary}
            />
            <BenefitCardGrid
              title="Platform Advantages"
              items={artisanData.platformBenefits}
              color={colors.accent}
            />
          </div>
        </div>
      </HeroSection>

      {/* Commitment Section with Hover Effects */}
      <SectionWrapper title="Artisan Commitments" icon={<FaMedal />}>
        <IconCardGrid items={artisanData.responsibilities} color={colors.primary} />
      </SectionWrapper>

      {/* Interactive Dashboard */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <EarningsCalculator
                calculatorInput={calculatorInput}
                setCalculatorInput={setCalculatorInput}
                calculateEarnings={calculateEarnings}
                colors={colors}
              />
            </div>
            <div className="col-lg-6">
              <ProgressTracker
                steps={artisanData.interactive.progressSteps}
                colors={colors}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <SectionWrapper title="Global Success Stories" icon={<FaGlobe />}>
        <Slider {...sliderSettings}>
          {artisanData.interactive.testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} />
          ))}
        </Slider>
      </SectionWrapper>

      {/* Enhanced CTA Section */}
      <CTASection colors={colors} navigate={navigate} />
      <style>{styles}</style>
    </LuxuryContainer>
  );
};

// Reusable Components
const BenefitCardGrid = ({ title, items, color }) => (
  <div className="col-md-6">
    <div className="card h-100 shadow-lg">
      <div className="card-header" style={{ backgroundColor: color }}>
        <h3 className="h5 mb-0 text-white">{title}</h3>
      </div>
      <div className="card-body">
        <div className="row g-3">
          {items.map((item, i) => (
            <div key={i} className="col-6">
              <div className="d-flex align-items-center">
                <span className="icon-holder me-3" style={{ color }}>
                  {item.icon}
                </span>
                <div>
                  <h6 className="mb-0">{item.title}</h6>
                  <small className="text-muted">{item.text}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const IconCardGrid = ({ items, color }) => (
  <div className="row g-4">
    {items.map((item, i) => (
      <div key={i} className="col-md-3">
        <div className="card h-100 hover-scale">
          <div className="card-body">
            <div className="d-flex align-items-center mb-3">
              <span className="icon-holder me-3" style={{ color }}>
                {item.icon}
              </span>
              <h3 className="h6 mb-0">{item.title}</h3>
            </div>
            <p className="text-muted small">{item.text}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const EarningsCalculator = ({ calculatorInput, setCalculatorInput, calculateEarnings, colors }) => (
  <div className="calculator-card p-4 shadow-lg rounded-3">
    <h3 className="mb-4"><FaWallet /> Earnings Calculator</h3>
    <div className="mb-3">
      <label>Average Product Price ($)</label>
      <input
        type="number"
        className="form-control"
        value={calculatorInput.price}
        onChange={(e) => setCalculatorInput(prev => ({ ...prev, price: e.target.value }))}
      />
    </div>
    <div className="mb-4">
      <label>Monthly Sales Volume</label>
      <input
        type="number"
        className="form-control"
        value={calculatorInput.quantity}
        onChange={(e) => setCalculatorInput(prev => ({ ...prev, quantity: e.target.value }))}
      />
    </div>
    <div className="earnings-display h4 py-3 rounded" style={{ backgroundColor: `${colors.secondary}15` }}>
      Estimated Earnings: <span style={{ color: colors.secondary }}>${calculateEarnings()}</span>
    </div>
  </div>
);

const ProgressTracker = ({ steps, colors }) => (
  <div className="progress-tracker card h-100 p-4 shadow-lg rounded-3">
    <h3 className="mb-4"><FaRocket /> Onboarding Progress</h3>
    <div className="steps-container position-relative">
      {steps.map((step, i) => (
        <div key={i} className="step-item">
          <div className={`step-icon ${step.done ? "completed" : ""}`}
            style={{ backgroundColor: step.done ? colors.secondary : colors.light }}>
            {step.done ? "✓" : i + 1}
          </div>
          <div className="step-title">{step.title}</div>
        </div>
      ))}
      <div className="progress-line" style={{ backgroundColor: colors.light }} />
    </div>
  </div>
);

const TestimonialCard = ({ testimonial }) => (
  <div className="px-3">
    <div className="testimonial-card p-4 shadow-sm rounded-3 bg-white">
      <FaQuoteLeft className="text-muted mb-3" />
      <p className="mb-4">{testimonial.text}</p>
      <h6 className="mb-0 text-primary">{testimonial.name}</h6>
    </div>
  </div>
);

const SectionWrapper = ({ title, icon, children }) => (
  <section className="py-5">
    <div className="container">
      <h2 className="text-center mb-5">{icon} {title}</h2>
      {children}
    </div>
  </section>
);

const CTASection = ({ colors, navigate }) => (
  <section className="py-5" style={{ backgroundColor: colors.primary }}>
    <div className="container text-center">
      <h2 className="text-white mb-4">Ready to Join Our Craft Revolution?</h2>
      <div className="d-flex gap-3 justify-content-center flex-wrap">
        <button
          className="btn btn-lg btn-warning px-5 py-3 fw-bold"
          onClick={() => navigate("/artisan-register")}
        >
          Start Selling Now
        </button>
        <button
          className="btn btn-lg btn-outline-light px-5 py-3 fw-bold"
          onClick={() => navigate("/artisan-login")}
        >
          Access Dashboard
        </button>
      </div>
      <div className="mt-4 text-light opacity-75">
        <small className="d-block">Zero listing fees • 24/7 support • GDPR compliance</small>
        <small>Secure payments • Chargeback protection • Marketing support</small>
      </div>
    </div>
  </section>
);

// Styles
const styles = `
  .hover-scale {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(42,45,52,0.1);
  }
  .hover-scale:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
  .icon-holder {
    transition: transform 0.3s ease;
  }
  .hover-scale:hover .icon-holder {
    transform: rotate(15deg) scale(1.1);
  }
  .progress-line {
    position: absolute;
    height: 2px;
    width: 70%;
    top: 20%;
    left: 15%;
    z-index: 0;
  }
  .step-item {
    text-align: center;
    z-index: 1;
    flex: 1;
  }
  .step-icon {
    width: 40px;
    height: 40px;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 10px;
    transition: all 0.3s ease;
  }
  .float-animation {
    animation: float 3s ease-in-out infinite;
  }
  @keyframes float {
    0%, 100% { transform: translatey(0); }
    50% { transform: translatey(-10px); }
  }
  @media (max-width: 768px) {
    .display-4 {
      font-size: 2.5rem;
    }
    .testimonial-card {
      margin: 0 10px;
    }
  }
`;

export default ArtisanResponsibilities;