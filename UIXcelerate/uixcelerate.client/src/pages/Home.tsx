import { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface UiElement {
    id: number;
    name: string;
    htmlCode: string;
    cssCode: string;
    createdAt: string;
}

const HomePage: React.FC = () => {
    const [elements, setElements] = useState<UiElement[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [iframeHeights, setIframeHeights] = useState<number[]>([]);
    const elementRefs = useRef<(HTMLDivElement | null)[]>([]);
    const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([]);

    const fetchElements = async () => {
        try {
            setLoading(true);
            const response = await fetch("https://localhost:7168/api/elements");
            if (!response.ok) throw new Error("Failed to fetch elements.");
            const data = await response.json();

            const sortedElements = data.sort((a: UiElement, b: UiElement) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });

            setElements(sortedElements);
            setError(null);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchElements();
    }, []);

    useEffect(() => {
        const updateIframeHeights = () => {
            const colsPerRow = 4;
            const newHeights: number[] = [];

            for (let i = 0; i < elements.length; i += colsPerRow) {
                const rowIframes = iframeRefs.current.slice(i, i + colsPerRow);
                const heights = rowIframes.map(
                    (iframe) => iframe?.contentDocument?.body.scrollHeight || 0
                );
                const maxHeight = Math.max(...heights, 100);

                for (let j = 0; j < rowIframes.length; j++) {
                    newHeights[i + j] = maxHeight + 25;
                }
            }

            setIframeHeights(newHeights);
        };

        const observers: MutationObserver[] = [];

        elements.forEach((_, index) => {
            const iframe = iframeRefs.current[index];
            if (!iframe) return;

            iframe.onload = () => {
                const doc = iframe.contentDocument;
                if (doc?.body) {
                    const observer = new MutationObserver(() =>
                        setTimeout(updateIframeHeights, 100)
                    );
                    observer.observe(doc.body, { childList: true, subtree: true });
                    observers.push(observer);
                }
                updateIframeHeights();
            };
        });

        updateIframeHeights();
        window.addEventListener("resize", updateIframeHeights);

        return () => {
            observers.forEach((observer) => observer.disconnect());
            window.removeEventListener("resize", updateIframeHeights);
        };
    }, [elements]);

    if (loading && elements.length === 0) {
        return (
            <Container fluid>
                <Row>
                    <Col xs={12} md={12}>
                        <div className="main-content p-3">
                            <h2>Welcome to UIXcelerate</h2>
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
                    <Col xs={12} md={12}>
                        <div className="main-content p-3">
                            <h3>Latest Added UI Elements</h3>
                            <p>Error: {error}</p>
                            <Button variant="primary" onClick={fetchElements}>
                                Retry
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={12}>
                    <div className="main-content p-3">
                        <h2 className="m-3">Latest Added UI Elements</h2>
                        <Row className="justify-content-center">
                            {elements.slice(0, 20).map((element, index) => (
                                <Col key={element.id} xs={12} md={6} lg={3} className="mb-4">
                                    <div
                                        ref={(el) => {
                                            elementRefs.current[index] = el;
                                        }}
                                        className="element-container d-flex flex-column align-items-center"
                                    >
                                        <iframe
                                            ref={(el) => {
                                                iframeRefs.current[index] = el;
                                            }}
                                            srcDoc={`<html>
                                                <head>
                                                    <style>
                                                        body {
                                                            display: flex;
                                                            justify-content: center;
                                                            align-items: center;
                                                            height: 100vh;
                                                            margin: 0;
                                                            background-color: ${window.matchMedia(
                                                "(prefers-color-scheme: dark)"
                                            ).matches ? "#121212" : "white"};
                                                            color: ${window.matchMedia(
                                                "(prefers-color-scheme: dark)"
                                            ).matches ? "white" : "black"};
                                                        }
                                                        ${element.cssCode}
                                                    </style>
                                                </head>
                                                <body>${element.htmlCode}</body>
                                            </html>`}
                                            style={{
                                                width: "100%",
                                                height: `${iframeHeights[index] || 100}px`,
                                                border: "none",
                                                borderRadius: "15px",
                                            }}
                                            title={`Element Preview ${element.id}`}
                                        />
                                        <Link to={`/element/${element.id}`} className="mt-2">
                                            <Button variant="primary">View Code</Button>
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

export default HomePage;
