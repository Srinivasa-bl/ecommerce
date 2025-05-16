import React from "react";

const FeaturedCollections = () => {
  const products = [
    {
      title: "Artisan Necklaces",
      description: "Hand-forged gold-plated elegance",
      image:
        "https://i.pinimg.com/474x/cf/a2/df/cfa2dfb970872a382e20335cb0075023.jpg",
      price: "₹12,499",
      badge: "Bestseller",
    },
    {
      title: "Heritage Woodcraft",
      description: "Century-old carving techniques",
      image:
        "https://images.unsplash.com/photo-1603789766884-aef036cd3b5a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8SGVyaXRhZ2UlMjBXb29kY3JhZnQlMjBMaW1pdGVkJTIwRWRpdGlvbiUyMENlbnR1cnklMjBvbGQlMjBjYXJ2aW5nJTIwdGVjaG5pcXVlc3xlbnwwfHwwfHx8MA%3D%3D",
      price: "₹24,999",
      badge: "Limited Edition",
    },
    {
      title: "Handwoven Luxe",
      description: "24k gold-threaded masterpieces",
      image:
        "https://i.pinimg.com/474x/5c/0f/3e/5c0f3e66751bc9b8261698dd689bc761.jpg",
      price: "₹18,999",
      badge: "New Arrival",
    },
  ];

  return (
    <section className="container py-8 py-lg-10">
      <header className="text-center mb-8 mb-lg-10 px-3">
        <h2 className="display-4 fw-light mb-3">
          <span className="d-block mb-2 text-gold-600 font-serif">
            Golden Craftsmanship
          </span>
          <span className="h5 fw-light text-uppercase letter-spacing-3 text-muted">
            Curated Masterpieces
          </span>
        </h2>
      </header>

      <div className="row g-4 g-lg-6">
        {products.map((product, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4">
            <article className="card h-100 border-0 bg-white position-relative overflow-hidden hover-shadow-lg">
              <figure className="card-img-top position-relative overflow-hidden rounded-0 aspect-ratio-3x4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="img-fluid w-100 h-100 object-cover scale-on-hover"
                  loading="lazy"
                />
                <div className="position-absolute bottom-0 start-0 w-100 px-4 pb-3 pt-5 text-white gradient-overlay">
                  <h3 className="h4 mb-0 fw-light font-serif">{product.title}</h3>
                  <div className="separator-light my-3 w-25"></div>
                </div>
                {product.badge && (
                  <div className="position-absolute top-4 end-4 bg-gold-600 text-dark px-3 py-1 small fw-bold letter-spacing-2 text-uppercase">
                    {product.badge}
                  </div>
                )}
              </figure>

              <div className="card-body px-4 pt-4 pb-5 text-start">
                <p className="text-muted mb-4 fs-6 lh-sm opacity-80">
                  {product.description}
                </p>
                <div className="d-flex flex-column justify-content-start align-items-start gap-2">
                  <div className="h4 mb-0 text-gold-600 font-serif">
                    {product.price}
                  </div>
                  <button
                    className="btn btn-link text-dark p-0 fw-light text-uppercase letter-spacing-2 d-flex align-items-center gap-2"
                    aria-label={`Explore ${product.title} collection`}
                  >
                    Discover More
                    <span className="icon-arrow-right fs-5"></span>
                  </button>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

      <style>{`
        .text-gold-600 { color: #B89F6B; }
        .bg-gold-600 { background-color: #B89F6B; }
        .font-serif { font-family: 'Crimson Text', serif; }
        .letter-spacing-3 { letter-spacing: 3px; }

        .gradient-overlay {
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.7) 40%,
            transparent 100%
          );
        }

        .aspect-ratio-3x4 {
          aspect-ratio: 3/4;
        }

        .hover-shadow-lg {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          box-shadow: 0 12px 24px -6px rgba(0,0,0,0.05);
        }

        .hover-shadow-lg:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 48px -12px rgba(0,0,0,0.15);
        }

        .scale-on-hover {
          transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .scale-on-hover:hover {
          transform: scale(1.05);
        }

        .separator-light {
          height: 1px;
          background: rgba(255,255,255,0.3);
        }

        .icon-arrow-right {
          display: inline-block;
          width: 20px;
          height: 1px;
          background: currentColor;
          position: relative;
          transition: all 0.3s ease;
        }

        .icon-arrow-right::after {
          content: '';
          position: absolute;
          right: 0;
          top: -3px;
          width: 8px;
          height: 8px;
          border-right: 1px solid currentColor;
          border-top: 1px solid currentColor;
          transform: rotate(45deg);
        }

        .btn-link:hover .icon-arrow-right {
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.25rem;
          }
          .aspect-ratio-3x4 {
            aspect-ratio: 2/3;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedCollections;
