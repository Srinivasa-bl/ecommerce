import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./herosection.css";

const HeroSection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll(".hero-content > *");
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      cards.forEach((card) => {
        const speed = card.dataset.speed || 1;
        const xOffset = (x - 0.5) * 20 * speed;
        const yOffset = (y - 0.5) * 20 * speed;
        card.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-bg-container">
        <div className="hero-bg-photo"></div>
        <div className="hero-bg-gradient"></div>
        <div className="hero-bg-particles"></div>
        <div className="hero-bg-texture"></div>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          <span data-speed="0.8">Artisan</span>
          <span data-speed="1.2" className="accent-gradient">
            Craftsmanship
          </span>
        </h1>
        <p className="hero-tagline" data-speed="0.9">
          Where Every Piece Tells a Story of Tradition and Skill
        </p>
        <div className="hero-buttons" data-speed="1.1">
          <button onClick={() => navigate("/marketplace")} className="btn-magnetic">
            <span className="btn-background"></span>
            <span className="btn-content">
              Discover Masterpieces
              <svg className="btn-arrow" viewBox="0 0 24 24">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
              </svg>
            </span>
          </button>
          <button onClick={() => navigate("/artisan-responsibilities")} className="btn-magnetic">
            <span className="btn-background"></span>
            <span className="btn-content">
              Join Artisan Legacy
              <svg className="btn-sparkle">
                <path d="M12 2l1.5 3.5L17 6l-3.5 1.5L12 11l-1.5-3.5L7 6l3.5-1.5L12 2z" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);