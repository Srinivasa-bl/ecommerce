import React, { useEffect, useState } from 'react';
import { Carousel, Card, Container, Row, Col, Form, Button, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsSearch, BsStarFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        ethicalScore: 0,
        priceRange: [0, 100000],
        searchQuery: '',
        priceStep: 1000
    });
    const [sortBy, setSortBy] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Advanced filtering with debounced search
    const filteredProducts = products.filter(product => {
        const searchRegex = new RegExp(filters.searchQuery, 'i');
        return (
            (searchRegex.test(product.name) ||
                searchRegex.test(product.description) ||
                searchRegex.test(product.materials)) &&
            (!filters.category || product.artisanCategory === filters.category) &&
            product.ethicalScore >= filters.ethicalScore &&
            product.price >= filters.priceRange[0] &&
            product.price <= filters.priceRange[1]
        );
    });

    // Enhanced sorting options
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price_asc': return a.price - b.price;
            case 'price_desc': return b.price - a.price;
            case 'ethical_desc': return b.ethicalScore - a.ethicalScore;
            case 'popularity': return b.salesCount - a.salesCount;
            default: return new Date(b.createdAt) - new Date(a.createdAt);
        }
    });

    // Unified price range handler
    const handlePriceRangeChange = (values) => {
        setFilters(prev => ({
            ...prev,
            priceRange: [values[0], values[1]]
        }));
    };

    return (
        <Container className="my-5">
            {/* Advanced Search Header */}
            <div className="search-header mb-5 p-4 bg-dark text-white rounded-3">
                <h2 className="mb-4">Discover Ethical Products</h2>
                <div className="position-relative">
                    <BsSearch className="position-absolute top-50 start-0 translate-middle ms-3 fs-5" />
                    <Form.Control
                        type="search"
                        placeholder="Search by product name, materials, or description..."
                        value={filters.searchQuery}
                        onChange={e => setFilters({ ...filters, searchQuery: e.target.value })}
                        className="ps-5 rounded-pill border-0 py-2 shadow"
                    />
                </div>
            </div>

            {/* Revised Price Range Filter */}
            <div className="filter-sidebar bg-light p-4 rounded-3 shadow-sm mb-4">
                <Row className="g-4">
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                value={filters.category}
                                onChange={e => setFilters({ ...filters, category: e.target.value })}
                                className="rounded-pill"
                            >
                                <option value="">All Categories</option>
                                {[...new Set(products.map(p => p.artisanCategory))].map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Ethical Rating</Form.Label>
                            <div className="d-flex align-items-center gap-2">
                                <Form.Range
                                    min="0"
                                    max="10"
                                    value={filters.ethicalScore}
                                    onChange={e => setFilters({ ...filters, ethicalScore: e.target.value })}
                                />
                                <Badge bg="success" className="fs-6">{filters.ethicalScore}+</Badge>
                            </div>
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group>
                            <Form.Label className="d-flex justify-content-between">
                                <span>Price Range</span>
                                <span className="text-muted">
                                    ${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}
                                </span>
                            </Form.Label>

                            {/* Simulated dual-range slider */}
                            <div className="range-slider-container mb-3">
                                <div className="position-relative" style={{ height: '30px' }}>
                                    <div className="slider-track" style={{
                                        height: '4px',
                                        backgroundColor: '#dee2e6',
                                        top: '50%',
                                        transform: 'translateY(-50%)'
                                    }} />
                                    <input
                                        type="range"
                                        min="0"
                                        max="100000"
                                        value={filters.priceRange[0]}
                                        onChange={(e) => handlePriceRangeChange([
                                            parseInt(e.target.value),
                                            filters.priceRange[1]
                                        ])}
                                        className="form-range position-absolute top-50 start-0"
                                        style={{
                                            width: '100%',
                                            zIndex: 3,
                                            appearance: 'none',
                                            pointerEvents: 'none',
                                            opacity: 0
                                        }}
                                    />
                                    <input
                                        type="range"
                                        min="0"
                                        max="100000"
                                        value={filters.priceRange[1]}
                                        onChange={(e) => handlePriceRangeChange([
                                            filters.priceRange[0],
                                            parseInt(e.target.value)
                                        ])}
                                        className="form-range position-absolute top-50 start-0"
                                        style={{
                                            width: '100%',
                                            zIndex: 4,
                                            appearance: 'none',
                                            pointerEvents: 'none',
                                            opacity: 0
                                        }}
                                    />
                                    {/* Custom slider thumbs */}
                                    <div className="position-absolute" style={{
                                        left: `${(filters.priceRange[0] / 100000) * 100}%`,
                                        top: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 1
                                    }}>
                                        <div style={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            backgroundColor: '#0d6efd',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                        }} />
                                    </div>
                                    <div className="position-absolute" style={{
                                        left: `${(filters.priceRange[1] / 100000) * 100}%`,
                                        top: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 1
                                    }}>
                                        <div style={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            backgroundColor: '#0d6efd',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                        }} />
                                    </div>
                                    {/* Active range fill */}
                                    <div style={{
                                        position: 'absolute',
                                        left: `${(filters.priceRange[0] / 100000) * 100}%`,
                                        right: `${100 - (filters.priceRange[1] / 100000) * 100}%`,
                                        height: '4px',
                                        backgroundColor: '#0d6efd',
                                        top: '50%',
                                        transform: 'translateY(-50%)'
                                    }} />
                                </div>
                            </div>

                            {/* Number inputs */}
                            <div className="d-flex gap-3">
                                <Form.Control
                                    type="number"
                                    min="0"
                                    max={filters.priceRange[1]}
                                    value={filters.priceRange[0]}
                                    onChange={(e) => handlePriceRangeChange([
                                        Math.min(parseInt(e.target.value), filters.priceRange[1]),
                                        filters.priceRange[1]
                                    ])}
                                    className="rounded-pill text-center"
                                    placeholder="Min price"
                                />
                                <div className="text-muted my-auto">–</div>
                                <Form.Control
                                    type="number"
                                    min={filters.priceRange[0]}
                                    max="100000"
                                    value={filters.priceRange[1]}
                                    onChange={(e) => handlePriceRangeChange([
                                        filters.priceRange[0],
                                        Math.max(parseInt(e.target.value), filters.priceRange[0])
                                    ])}
                                    className="rounded-pill text-center"
                                    placeholder="Max price"
                                />
                            </div>
                        </Form.Group>
                    </Col>

                    <Col md={2}>
                        <Form.Group>
                            <Form.Label>Sort By</Form.Label>
                            <Form.Select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                className="rounded-pill"
                            >
                                <option value="">Newest</option>
                                <option value="price_asc">Price Low-High</option>
                                <option value="price_desc">Price High-Low</option>
                                <option value="ethical_desc">Ethical Rating</option>
                                <option value="popularity">Popularity</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
            </div>

            {/* Products Grid */}
            <Row className="g-4">
                {sortedProducts.map(product => (
                    <Col key={product.id} xl={3} lg={4} md={6}>
                        <Card
                            className="h-100 shadow-sm border-0 overflow-hidden"
                            onClick={() => navigate(`/products/${product.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="position-relative">
                                <Carousel
                                    indicators={false}
                                    interval={null}
                                    className="product-carousel"
                                >
                                    {product.imageData?.map((img, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                src={img || '/placeholder.jpg'}
                                                alt={`${product.name} ${index + 1}`}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>

                                {/* Thumbnail Navigation */}
                                <div className="carousel-thumbnails d-flex gap-2 justify-content-center mt-2">
                                    {product.imageData.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`thumbnail-indicator ${index === 0 ? 'active' : ''}`}
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                border: '2px solid #fff',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <img
                                                src={product.imageData[index]}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="img-fluid h-100 w-100 object-fit-cover"
                                            />
                                        </button>
                                    ))}
                                </div>

                                {product.stock <= 5 && (
                                    <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
                                        Only {product.stock} left
                                    </Badge>
                                )}
                            </div>

                            <Card.Body className="d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <Badge bg="warning" text="dark" className="fs-7">
                                        {product.artisanCategory}
                                    </Badge>
                                    <div className="d-flex align-items-center gap-1">
                                        <BsStarFill className="text-warning" />
                                        <span className="text-muted fs-7">
                                            {product.ethicalScore} /10
                                        </span>
                                    </div>
                                </div>

                                <h5 className="card-title mb-2">{product.name}</h5>
                                <p className="card-text text-secondary small flex-grow-1">
                                    {product.description}
                                </p>

                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <div className="price-display fs-5 fw-bold text-primary">
                                        ${product.price.toLocaleString()}
                                    </div>
                                    <Button variant="dark" size="sm" className="rounded-pill px-3">
                                        View Details
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {!loading && sortedProducts.length === 0 && (
                <div className="text-center py-5">
                    <h4 className="text-muted">No products match your criteria</h4>
                    <Button
                        variant="outline-secondary"
                        className="mt-3"
                        onClick={() => setFilters({
                            category: '',
                            ethicalScore: 0,
                            priceRange: [0, 1000000],
                            searchQuery: '',
                            priceStep: 1000
                        })}
                    >
                        Clear Filters
                    </Button>
                </div>
            )}
        </Container>
    );
};

export default ProductList;