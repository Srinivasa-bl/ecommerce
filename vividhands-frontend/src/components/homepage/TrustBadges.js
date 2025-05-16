import React from "react";
import {
  FaLock,
  FaLeaf,
  FaTruck,
  FaHandshake,
  FaHeadset,
} from "react-icons/fa";
import { HiOutlineCurrencyRupee } from "react-icons/hi";

const TrustBadges = () => {
  const badges = [
    {
      icon: <FaLock aria-hidden="true" />,
      title: "Secure Payments",
      description: "256-bit SSL encrypted transactions",
    },
    {
      icon: <FaLeaf aria-hidden="true" />,
      title: "Eco-Friendly",
      description: "Sustainable & biodegradable materials",
    },
    {
      icon: <FaTruck aria-hidden="true" />,
      title: "Reliable Shipping",
      description: "Global delivery in 3-7 business days",
    },
    {
      icon: <HiOutlineCurrencyRupee aria-hidden="true" />,
      title: "Fair Pricing",
      description: "Direct from artisans, no middlemen",
    },
    {
      icon: <FaHandshake aria-hidden="true" />,
      title: "Satisfaction Guarantee",
      description: "30-day hassle-free returns",
    },
    {
      icon: <FaHeadset aria-hidden="true" />,
      title: "Dedicated Support",
      description: "24/7 customer service",
    },
  ];

  return (
    <section className="py-5 position-relative overflow-hidden">
      <div className="container">
        <div className="text-center mb-5 position-relative">
          <h2 className="h1 fw-bold mb-3">Why Choose VividHands</h2>
          <p className="lead text-secondary mb-4">
            Commitment to Excellence in Craftsmanship
          </p>
          <div className="divider mx-auto bg-gold" />
        </div>

        <div className="row g-4 g-lg-5">
          {badges.map((badge, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-2">
              <div className="trust-card p-4 text-center h-100">
                <div className="icon-wrapper mb-3 mx-auto">{badge.icon}</div>
                <h3 className="h6 fw-bold mb-2">{badge.title}</h3>
                <p className="small text-muted mb-0 opacity-75">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        :root {
          --gold: #d4af37;
          --darkgold: #b8860b;
          --transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .bg-gold {
          background: var(--gold);
        }

        .trust-card {
          background: #ffffff;
          border-radius: 1rem;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03),
                      0 2px 4px rgba(0, 0, 0, 0.03),
                      0 4px 8px rgba(0, 0, 0, 0.03);
          transition: var(--transition);
          position: relative;
          border: 1px solid rgba(212, 175, 55, 0.15);
        }

        .trust-card:hover {
          transform: translateY(-0.5rem);
          box-shadow: 0 10px 20px rgba(212, 175, 55, 0.1),
                      0 6px 6px rgba(212, 175, 55, 0.05);
        }

        .icon-wrapper {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #fff9f0 0%, #fef5e7 100%);
          border-radius: 16px;
          font-size: 1.75rem;
          color: var(--gold);
          transition: var(--transition);
        }

        .trust-card:hover .icon-wrapper {
          background: linear-gradient(45deg, var(--gold), var(--darkgold));
          transform: rotate(10deg) scale(1.1);
          color: white;
        }

        .divider {
          width: 80px;
          height: 3px;
          opacity: 0.8;
        }

        @media (prefers-reduced-motion: no-preference) {
          .trust-card {
            animation: fadeIn 0.6s ease forwards;
            opacity: 0;
          }

          @keyframes fadeIn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
      `}</style>
    </section>
  );
};

export default TrustBadges;
