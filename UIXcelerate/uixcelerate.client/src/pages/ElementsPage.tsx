import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importing React Router Link
import Sidebar from "../components/Sidebar";

interface UiElement {
    id: number;
    name: string;
    htmlCode: string;
    cssCode: string;
}

const ElementsPage: React.FC = () => {
    const [elements, setElements] = useState<UiElement[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch the elements from the backend
    useEffect(() => {
        const fetchElements = async () => {
            try {
                const response = await fetch("https://localhost:7168/api/elements");
                if (!response.ok) {
                    throw new Error("Failed to fetch elements.");
                }
                const data = await response.json();
                setElements(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message); // Type assertion
                } else {
                    setError("An unknown error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchElements();
    }, []);

    if (loading) {
        return (
            <Container fluid>
                <Row>
                    <Col xs={12} md={2} className="sidebar">
                        <Sidebar />
                    </Col>
                    <Col xs={12} md={10}>
                        <div className="main-content p-3">
                            <h2>Elements Page</h2>
                            <Spinner animation="border" variant="primary" />
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

    if (error) {
        return (
            <Container fluid>
                <Row>
                    <Col xs={12} md={2} className="sidebar">
                        <Sidebar />
                    </Col>
                    <Col xs={12} md={10}>
                        <div className="main-content p-3">
                            <h2>Elements Page</h2>
                            <p>Error: {error}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={2} className="sidebar">
                    <Sidebar />
                </Col>
                <Col xs={12} md={10}>
                    <div className="main-content p-3">
                        <h2>Elements Page</h2>
                        <p>Here you'll find all UI elements like buttons, cards, etc.</p>
                        <Row>
                            {elements.map((element) => (
                                <Col key={element.id} xs={12} md={6} lg={4} className="mb-4">
                                    <Card className="element-card">
                                        <Card.Body className="d-flex justify-content-center align-items-center">
                                            <div className={`element-preview-${element.id}`} style={{ width: "100%", height: "200px" }}>
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: element.htmlCode,
                                                    }}
                                                ></div>
                                                <style>{`
                                                    .element-preview-${element.id} {
                                                        ${element.cssCode}
                                                        display: flex;
                                                        justify-content: center;
                                                        align-items: center;
                                                        height: 100%;
                                                    }
                                                `}</style>
                                            </div>
                                        </Card.Body>
                                        {/* View Code Button */}
                                        <Card.Footer>
                                            <Link to={`/element-editor/${element.id}`}>
                                                <Button variant="primary">View Code</Button>
                                            </Link>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ElementsPage;
