import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container, Row, Col, Card, Alert, Spinner, Badge,
    Accordion, ListGroup, ProgressBar, Button, Modal, Form
} from 'react-bootstrap';
import {
    BsBoxSeam, BsTruck, BsCheckCircle, BsCreditCard,
    BsClockHistory, BsStar, BsStarFill
} from 'react-icons/bs';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/currency';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user, authChecked } = useAuth();
    const navigate = useNavigate();
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [review, setReview] = useState({ rating: 0, comment: '' });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (!user?.userId) return;

                const response = await fetch(
                    `http://localhost:8080/api/orders/user/${user.userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('userToken')}`
                        }
                    }
                );

                if (!response.ok) throw new Error('Failed to fetch orders');
                const data = await response.json();
                setOrders(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (authChecked && user) fetchOrders();
    }, [user, authChecked]);

    const calculateDeliveryStatus = (orderDate) => {
        if (!orderDate) return { date: 'N/A', daysRemaining: 0, progress: 100 };

        const deliveryDate = new Date(orderDate);
        deliveryDate.setDate(deliveryDate.getDate() + 5);
        const today = new Date();

        const timeDifference = deliveryDate.getTime() - today.getTime();
        const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));
        const progress = Math.max(0, Math.min(100 - (daysRemaining / 5) * 100, 100));

        return {
            date: deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            daysRemaining: daysRemaining > 0 ? daysRemaining : 0,
            progress,
            isDelivered: daysRemaining <= 0
        };
    };

    const handleReviewSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                },
                body: JSON.stringify({
                    productId: selectedProduct?.id,
                    rating: review.rating,
                    comment: review.comment
                })
            });

            if (!response.ok) throw new Error('Review submission failed');

            setShowReviewModal(false);
            setReview({ rating: 0, comment: '' });
        } catch (error) {
            console.error('Review error:', error);
        }
    };

    const RatingStars = ({ rating }) => (
        <div className="d-flex align-items-center">
            {[...Array(5)].map((_, i) => (
                i < rating ?
                    <BsStarFill key={i} className="text-warning me-1" /> :
                    <BsStar key={i} className="text-muted me-1" />
            ))}
        </div>
    );

    if (!authChecked) {
        return (
            <Container className="my-5 text-center">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    if (!user) {
        navigate('/login');
        return null;
    }

    if (loading) {
        return (
            <Container className="my-5 text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3 text-muted">Loading your orders...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="my-5">
                <Alert variant="danger">
                    <h4>Error Loading Orders</h4>
                    <p>{error}</p>
                </Alert>
            </Container>
        );
    }

    if (orders.length === 0) {
        return (
            <Container className="my-5 text-center">
                <Card className="border-secondary shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
                    <Card.Body className="py-5">
                        <BsBoxSeam size={48} className="text-secondary mb-3" />
                        <h3>No Orders Found</h3>
                        <p className="text-muted">You haven't placed any orders yet.</p>
                        <Button variant="primary" onClick={() => navigate('/')}>
                            Continue Shopping
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <h2 className="mb-4 d-flex align-items-center">
                <BsBoxSeam className="me-3" /> Order History
            </h2>

            <Row className="g-4">
                {orders.map((order) => {
                    const delivery = calculateDeliveryStatus(order?.orderDate);
                    const orderDate = order?.orderDate ? new Date(order.orderDate) : new Date();

                    return (
                        <Col key={order?.id} xs={12}>
                            <Card className="shadow-sm mb-4">
                                <Card.Body className="p-4">
                                    <Row className="mb-4">
                                        <Col md={6}>
                                            <h6>Shipping Address</h6>
                                            <div className="text-muted small">
                                                <div>{order?.deliveryAddress}</div>
                                                <div>{order?.city}, {order?.state}</div>
                                                <div>{order?.zipCode}</div>
                                                <div>Phone: {order?.phoneNumber}</div>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <h6>Order Summary</h6>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item className="d-flex justify-content-between px-0">
                                                    <span>Items:</span>
                                                    <span>{formatCurrency(order?.totalAmount)}</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="d-flex justify-content-between px-0">
                                                    <span>Shipping:</span>
                                                    <span className="text-success">FREE</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="d-flex justify-content-between px-0 fw-bold">
                                                    <span>Total:</span>
                                                    <span>{formatCurrency(order?.totalAmount)}</span>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Col>
                                    </Row>

                                    <Row className="g-4 align-items-center">
                                        <Col md={3}>
                                            <div className="d-flex align-items-center mb-3">
                                                <Badge bg="light" text="dark" className="me-2">
                                                    #{order?.razorpayPaymentId?.slice(-6)}
                                                </Badge>
                                                <small className="text-muted">
                                                    {orderDate.toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </small>
                                            </div>
                                            <h5 className="mb-0">{formatCurrency(order?.totalAmount || 0)}</h5>
                                        </Col>

                                        <Col md={5}>
                                            <ProgressBar
                                                now={delivery.progress}
                                                variant={delivery.isDelivered ? 'success' : 'primary'}
                                                label={
                                                    delivery.isDelivered
                                                        ? 'Delivered'
                                                        : `${delivery.daysRemaining} days remaining`
                                                }
                                                className="mb-3"
                                            />
                                            <div className="d-flex align-items-center text-muted small">
                                                <BsTruck className="me-2" />
                                                {delivery.isDelivered ? 'Delivered on' : 'Estimated delivery'}{' '}
                                                {delivery.date}
                                            </div>
                                        </Col>

                                        <Col md={4}>
                                            <ListGroup variant="flush">
                                                {order?.items?.map((item) => (
                                                    <ListGroup.Item key={item?.id}>
                                                        <Row className="align-items-center g-3">
                                                            <Col xs={3} md={2}>
                                                                <img
                                                                    src={item?.product?.imageData?.[0] || '/placeholder-product.jpg'}
                                                                    alt={item?.product?.name || 'Product image'}
                                                                    className="img-fluid rounded"
                                                                    style={{
                                                                        maxHeight: '100px',
                                                                        objectFit: 'cover'
                                                                    }}
                                                                />
                                                            </Col>
                                                            <Col xs={9} md={10}>
                                                                <div className="d-flex justify-content-between align-items-start">
                                                                    <div>
                                                                        <h6>{item?.product?.name}</h6>
                                                                        <p className="text-muted small mb-2">
                                                                            {item?.product?.description?.substring(0, 100)}...
                                                                        </p>
                                                                        <div className="d-flex align-items-center">
                                                                            <RatingStars rating={item?.product?.averageRating || 0} />
                                                                            <span className="ms-2 small text-muted">
                                                                                ({item?.product?.reviewCount || 0} reviews)
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-end">
                                                                        <div className="d-flex justify-content-between small">
                                                                            <span>
                                                                                {item?.quantity} × {formatCurrency(item?.price)}
                                                                            </span>
                                                                        </div>
                                                                        {delivery.isDelivered && (
                                                                            <Button
                                                                                variant="outline-primary"
                                                                                size="sm"
                                                                                className="mt-2"
                                                                                onClick={() => {
                                                                                    setSelectedProduct(item.product);
                                                                                    setShowReviewModal(true);
                                                                                }}
                                                                            >
                                                                                Write Review
                                                                            </Button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        </Col>
                                    </Row>

                                    <hr className="my-4" />

                                    <Row className="g-4 text-center small">
                                        <Col>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <BsCreditCard className="me-2" />
                                                Paid with Razorpay
                                            </div>
                                            <code className="text-muted">{order?.razorpayPaymentId || 'N/A'}</code>
                                        </Col>
                                        <Col>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <BsCheckCircle
                                                    className={`me-2 ${delivery.isDelivered ? 'text-success' : 'text-primary'}`}
                                                />
                                                {delivery.isDelivered ? 'Order Completed' : 'In Transit'}
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <BsClockHistory className="me-2" />
                                                Ordered: {orderDate.toLocaleString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>

            {/* Review Modal */}
            <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Review {selectedProduct?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Rating</Form.Label>
                            <div className="d-flex">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <BsStarFill
                                        key={rating}
                                        className={`cursor-pointer me-2 ${rating <= review.rating ? 'text-warning' : 'text-muted'}`}
                                        onClick={() => setReview({ ...review, rating })}
                                    />
                                ))}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Review</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={review.comment}
                                onChange={(e) => setReview({ ...review, comment: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleReviewSubmit}>
                        Submit Review
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default OrdersPage;