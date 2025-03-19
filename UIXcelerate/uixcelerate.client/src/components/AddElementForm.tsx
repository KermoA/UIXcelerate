import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3 } from "react-icons/fa";

const AddElementForm: React.FC = () => {
    const [name, setName] = useState("");
    const [htmlCode, setHtmlCode] = useState("");
    const [cssCode, setCssCode] = useState("");
    const [category, setCategory] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [key, setKey] = useState<string>('html');
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const navigate = useNavigate();

    // Detect dark mode
    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleThemeChange = (e: MediaQueryListEvent) => {
            setIsDarkMode(e.matches);
        };
        setIsDarkMode(darkModeMediaQuery.matches);
        darkModeMediaQuery.addEventListener("change", handleThemeChange);
        return () => darkModeMediaQuery.removeEventListener("change", handleThemeChange);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newElement = {
            name,
            htmlCode,
            cssCode,
            category,
        };

        try {
            const response = await fetch("https://localhost:7168/api/elements", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newElement),
            });

            if (response.ok) {
                alert("Element added successfully");
                navigate("/elements");
            } else {
                alert("Failed to add element");
            }
        } catch (error) {
            console.error("Error adding element:", error);
        }
    };

    const updatePreview = () => {
        if (iframeRef.current) {
            const iframeDoc = iframeRef.current.contentDocument;
            if (iframeDoc) {
                iframeDoc.open();
                iframeDoc.write(htmlCode);
                iframeDoc.close();

                const styleTag = iframeDoc.createElement("style");
                styleTag.textContent = cssCode;
                iframeDoc.head.appendChild(styleTag);

                if (isDarkMode) {
                    iframeDoc.body.style.backgroundColor = "#121212";
                    iframeDoc.body.style.color = "white";
                } else {
                    iframeDoc.body.style.backgroundColor = "white";
                    iframeDoc.body.style.color = "black";
                }

                iframeDoc.body.style.display = "flex";
                iframeDoc.body.style.justifyContent = "center";
                iframeDoc.body.style.alignItems = "center";
                iframeDoc.body.style.height = "100vh";
                iframeDoc.body.style.margin = "0";
            }
        }
    };

    useEffect(() => {
        updatePreview();
    }, [htmlCode, cssCode, isDarkMode]);

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col xs={12} md={6}>
                    <h2>Add a New UI Element</h2>

                    <Form onSubmit={handleSubmit}>
                        <Tabs
                            id="editor-tabs"
                            activeKey={key}
                            onSelect={(k) => setKey(k!)}
                            className="mb-3"
                        >
                            <Tab eventKey="html" title={<><FaHtml5 className="html-icon" /> <strong className="html-icon">HTML</strong></>}>
                                <Editor
                                    height="400px"
                                    language="html"
                                    value={htmlCode}
                                    onChange={(value) => setHtmlCode(value || "")}
                                    theme={isDarkMode ? "vs-dark" : "vs"}
                                    options={{
                                        minimap: { enabled: false },
                                        lineNumbers: "on",
                                        scrollbar: {
                                            vertical: "hidden",
                                            horizontal: "auto",
                                        },
                                        renderLineHighlight: "all",
                                        overviewRulerLanes: 0,
                                        showFoldingControls: "always",
                                    }}
                                />
                            </Tab>
                            <Tab eventKey="css" title={<><FaCss3 className="css-icon" /> <strong className="css-icon">CSS</strong></>}>
                                <Editor
                                    height="400px"
                                    language="css"
                                    value={cssCode}
                                    onChange={(value) => setCssCode(value || "")}
                                    theme={isDarkMode ? "vs-dark" : "vs"}
                                    options={{
                                        minimap: { enabled: false },
                                        lineNumbers: "on",
                                        scrollbar: {
                                            vertical: "hidden",
                                            horizontal: "auto",
                                        },
                                        renderLineHighlight: "all",
                                        overviewRulerLanes: 0,
                                        showFoldingControls: "always",
                                    }}
                                />
                            </Tab>
                        </Tabs>

                        <Form.Group className="mb-3" controlId="formElementName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter element name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formElementCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="" selected disabled>Select a category</option>
                                <option value="buttons">Buttons</option>
                                <option value="checkboxes">Checkboxes</option>
                                <option value="toggle switches">Toggle Switches</option>
                                <option value="cards">Cards</option>
                                <option value="loaders">Loaders</option>
                                <option value="inputs">Inputs</option>
                                <option value="radio buttons">Radio Buttons</option>
                                <option value="forms">Forms</option>
                            </Form.Control>
                        </Form.Group>


                        <Button variant="primary" type="submit">
                            Add Element
                        </Button>
                    </Form>
                </Col>

                <Col xs={12} md={6}>
                    <h2>Live Preview</h2>
                    <iframe
                        ref={iframeRef}
                        title="Element Preview"
                        style={{ width: "100%", height: "500px", border: "none" }}
                    ></iframe>
                </Col>
            </Row>
        </Container>
    );
};

export default AddElementForm;
