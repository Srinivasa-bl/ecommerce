import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AboutUs = () => {
    return (
        <div className="about-us">
            {/* Hero Section */}
            <div className="hero-section text-white py-6">
                <div className="container text-center">
                    <h1 className="hero-title mb-4">About VividHands</h1>
                    <p className="hero-subtitle">Where Tradition Meets Contemporary Craftsmanship</p>
                    <p className="hero-description mt-4">Discover the perfect blend of heritage and innovation. Join us in celebrating the art of craftsmanship.</p>
                    <button className="btn cta-primary mt-4">Learn More</button>
                </div>
            </div>

            {/* Mission Section */}
            <div className="container py-6">
                <div className="row align-items-center g-5 mb-6">
                    <div className="col-lg-6">
                        <div className="image-wrapper mission-image">
                            <img
                                src="https://i.pinimg.com/736x/9c/11/b1/9c11b14e4c3f7d642e7167975358cf67.jpg"
                                alt="Artisan at work"
                                className="img-fluid"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="ps-xl-5">
                            <h2 className="section-title mb-4">Crafting Tomorrow's Heritage</h2>
                            <p className="lead-text mb-4">
                                At VividHands, we're redefining artisan commerce through innovative partnerships and
                                sustainable practices that empower makers and inspire conscious consumers.
                            </p>
                            <div className="mission-highlight">
                                <p className="highlight-text">
                                    Every creation tells a story of cultural preservation and modern innovation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="row g-4 mb-6">
                    <div className="col-md-3">
                        <div className="stat-card">
                            <i className="bi bi-globe2 stat-icon"></i>
                            <h3 className="stat-number">15K+</h3>
                            <p className="stat-label">Global Community</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stat-card">
                            <i className="bi bi-person-heart stat-icon"></i>
                            <h3 className="stat-number">850+</h3>
                            <p className="stat-label">Empowered Artisans</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stat-card">
                            <i className="bi bi-recycle stat-icon"></i>
                            <h3 className="stat-number">95%</h3>
                            <p className="stat-label">Eco Materials</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stat-card">
                            <i className="bi bi-stars stat-icon"></i>
                            <h3 className="stat-number">12+</h3>
                            <p className="stat-label">Design Awards</p>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="row g-4 mb-6">
                    <div className="col-lg-4">
                        <div className="value-card heritage-card">
                            <i className="bi bi-brush-fill value-icon"></i>
                            <h4>Artisanal Mastery</h4>
                            <p>Centuries-old techniques meet modern design sensibilities</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="value-card ethics-card">
                            <i className="bi bi-shield-check value-icon"></i>
                            <h4>Ethical Commitment</h4>
                            <p>Fair trade certified partnerships and transparent practices</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="value-card sustainability-card">
                            <i className="bi bi-globe value-icon"></i>
                            <h4>Sustainable Future</h4>
                            <p>Carbon-negative initiatives and regenerative materials</p>
                        </div>
                    </div>
                </div>

                {/* Artisan Story */}
                <div className="row g-5 align-items-center mb-6">
                    <div className="col-lg-6">
                        <div className="artisan-image-wrapper">
                            <img
                                src="https://i.pinimg.com/736x/d9/19/2e/d9192e04f413e8dc164490ba10433773.jpg"
                                alt="Artisan story"
                                className="img-fluid"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="artisan-story">
                            <h2 className="section-title mb-4">Generations of Craft</h2>
                            <div className="timeline">
                                <div className="timeline-item">
                                    <div className="timeline-marker"></div>
                                    <div className="timeline-content">
                                        <h5>Ancient Techniques</h5>
                                        <p>Preserving methods passed through generations</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-marker"></div>
                                    <div className="timeline-content">
                                        <h5>Modern Adaptation</h5>
                                        <p>Reinterpreting tradition for contemporary living</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-marker"></div>
                                    <div className="timeline-content">
                                        <h5>Sustainable Innovation</h5>
                                        <p>Pioneering eco-conscious material solutions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vision Section */}
                <div className="vision-section py-6 mb-6">
                    <div className="container text-center">
                        <h2 className="vision-title mb-3">Our Vision</h2>
                        <p className="vision-text">
                            To create a global movement where craftsmanship thrives, stories are preserved,
                            and every purchase makes a positive impact.
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center py-6">
                    <h3 className="cta-title mb-4">Join the Artisan Revival</h3>
                    <div className="cta-button-group">
                        <button className="btn cta-primary">
                            Discover Makers
                        </button>
                        <button className="btn cta-secondary">
                            Explore Craft
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                :root {
                    --primary: #2A5C6B;
                    --secondary: #E8C8A2;
                    --accent: #D46B4D;
                    --dark: #1A2E35;
                    --light: #F8F5F1;
                }

                .hero-section {
                    background: linear-gradient(45deg, var(--dark) 0%, var(--primary) 100%);
                    padding: 8rem 0;
                    position: relative;
                    overflow: hidden;
                }

                .hero-section::after {
                    content: '';
                    position: absolute;
                    bottom: -10px;
                    left: 0;
                    width: 100%;
                    height: 100px;
                    background: var(--light);
                    clip-path: polygon(0 0, 100% 0, 100% 20%, 0 100%);
                }

                .hero-title {
                    font-size: 4rem;
                    font-weight: 800;
                    letter-spacing: -0.03em;
                    text-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }

                .hero-subtitle {
                    font-size: 1.5rem;
                    letter-spacing: 0.08em;
                    opacity: 0.9;
                    text-transform: uppercase;
                }

                .mission-image {
                    border-radius: 20px;
                    overflow: hidden;
                    transform: rotate(-2deg);
                    box-shadow: 16px 16px 0 var(--secondary);
                    transition: transform 0.3s ease;
                }

                .mission-image:hover {
                    transform: rotate(0deg) scale(1.02);
                }

                .section-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: var(--dark);
                    position: relative;
                    margin-bottom: 2rem;
                }

                .section-title::after {
                    content: '';
                    position: absolute;
                    bottom: -10px;
                    left: 0;
                    width: 60px;
                    height: 4px;
                    background: var(--accent);
                }

                .stat-card {
                    background: var(--light);
                    padding: 2rem;
                    border-radius: 16px;
                    text-align: center;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 1px solid rgba(0,0,0,0.05);
                }

                .stat-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 12px 24px rgba(0,0,0,0.08);
                }

                .stat-icon {
                    font-size: 2.5rem;
                    color: var(--primary);
                    margin-bottom: 1rem;
                }

                .value-card {
                    padding: 2.5rem;
                    border-radius: 24px;
                    color: white;
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.3s ease;
                    min-height: 320px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .value-card::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);
                    transform: rotate(45deg);
                    transition: all 0.6s ease;
                }

                .value-card:hover::before {
                    animation: shine 1.5s;
                }

                .heritage-card { background: linear-gradient(45deg, var(--primary), #3A7C8B); }
                .ethics-card { background: linear-gradient(45deg, var(--accent), #E4896A); }
                .sustainability-card { background: linear-gradient(45deg, var(--dark), #2A4E55); }

                .timeline {
                    position: relative;
                    padding-left: 40px;
                }

                .timeline::before {
                    content: '';
                    position: absolute;
                    left: 20px;
                    top: 10px;
                    bottom: 10px;
                    width: 3px;
                    background: linear-gradient(to bottom, var(--primary), var(--accent));
                }

                .timeline-item {
                    position: relative;
                    padding: 2rem 0 2rem 40px;
                }

                .timeline-marker {
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: var(--secondary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    color: var(--dark);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }

                .vision-section {
                    background: linear-gradient(45deg, var(--primary), var(--dark));
                    border-radius: 24px;
                    position: relative;
                    overflow: hidden;
                }

                .vision-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px);
                    background-size: 20px 20px;
                }

                .cta-primary {
                    background: var(--accent);
                    color: white;
                    padding: 1rem 2.5rem;
                    border-radius: 50px;
                    transition: all 0.3s ease;
                }

                .cta-primary:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 24px rgba(212,107,77,0.3);
                }

                @keyframes shine {
                    0% { transform: translateX(-100%) rotate(45deg); }
                    100% { transform: translateX(100%) rotate(45deg); }
                }

                @media (max-width: 768px) {
                    .hero-title {
                        font-size: 2.5rem;
                    }

                    .mission-image {
                        transform: none;
                        margin-bottom: 2rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default AboutUs;