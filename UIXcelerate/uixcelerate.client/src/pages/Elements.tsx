import { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
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
    const [iframeHeight, setIframeHeight] = useState<number>(200); // Default height
    const elementRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Fetch elements from backend
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
                setError(err instanceof Error ? err.message : "An unknown error occurred.");
            } finally {
                setLoading(false);
            }
        };
        fetchElements();
    }, []);

    useEffect(() => {
        if (elementRefs.current.length) {
            const maxHeight = Math.max(
                ...elementRefs.current.map((el) => el?.offsetHeight || 0)
            );
            setIframeHeight(maxHeight);
        }
    }, [elements]);

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
                        <Row className="justify-content-center">
                            {elements.map((element, index) => (
                                <Col key={element.id} xs={12} md={6} lg={3} className="mb-4">
                                    <div
                                        ref={(el) => {
                                            elementRefs.current[index] = el;
                                        }}
                                        className="element-container d-flex flex-column align-items-center"
                                    >
                                        <iframe
                                            srcDoc={`<html>
                                                        <head>
                                                            <style>
                                                                body {
                                                                    display: flex;
                                                                    justify-content: center;
                                                                    align-items: center;
                                                                    height: 100vh;
                                                                    margin: 0;
                                                                    background-color: ${window.matchMedia("(prefers-color-scheme: dark)").matches
                                                                                            ? "#121212"
                                                                                            : "white"
                                                                                        };
                                                                    color: ${window.matchMedia("(prefers-color-scheme: dark)").matches
                                                                                            ? "white"
                                                                                            : "black"
                                                                                        };
                                                                }
                                                                ${element.cssCode}
                                                            </style>
                                                        </head>
                                                        <body>${element.htmlCode}</body>
                                                    </html>`}
                                            style={{
                                                width: "100%",
                                                height: `${iframeHeight}px`,
                                                border: "none",
                                            }}
                                            title={`Element Preview ${element.id}`}
                                        />
                                        <Link to={`/element/${element.id}`} className="mt-2">
                                            <button className="btn btn-primary">View Code</button>
                                        </Link>
                                    </div>
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
