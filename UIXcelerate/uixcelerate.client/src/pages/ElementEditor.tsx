import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Tab, Tabs, Toast } from "react-bootstrap";
import Editor from "@monaco-editor/react";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3 } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";

interface UiElement {
    id: number;
    name: string;
    htmlCode: string;
    cssCode: string;
}

const ElementEditorPage: React.FC = () => {
    const { id } = useParams();
    const [element, setElement] = useState<UiElement | null>(null);
    const [htmlCode, setHtmlCode] = useState<string>("");
    const [cssCode, setCssCode] = useState<string>("");
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [key, setKey] = useState<string>('html');
    const [showToast, setShowToast] = useState<boolean>(false);  // Toast state

    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleThemeChange = (e: MediaQueryListEvent) => {
            setIsDarkMode(e.matches);
        };

        setIsDarkMode(darkModeMediaQuery.matches);

        darkModeMediaQuery.addEventListener("change", handleThemeChange);

        return () => {
            darkModeMediaQuery.removeEventListener("change", handleThemeChange);
        };
    }, []);

    useEffect(() => {
        const fetchElement = async () => {
            const response = await fetch(`https://localhost:7168/api/elements/${id}`);
            const data = await response.json();
            setElement(data);
            setHtmlCode(data.htmlCode);
            setCssCode(data.cssCode);
        };
        fetchElement();
    }, [id]);

    const handleSave = () => {
        // Save logic (not implemented in this example)
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

    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code).then(() => {
            setShowToast(true);  // Show toast when copy is successful
            setTimeout(() => setShowToast(false), 2000); // Hide toast after 2 seconds
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    useEffect(() => {
        updatePreview();
    }, [htmlCode, cssCode, isDarkMode]);

    if (!element) {
        return <div>Loading...</div>;
    }

    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={6}>
                    <h2>Element Preview</h2>
                    <iframe
                        ref={iframeRef}
                        title="Element Preview"
                        style={{ width: "100%", height: "500px", border: "none" }}
                    ></iframe>
                </Col>
                <Col xs={12} md={6}>
                    <Tabs
                        id="editor-tabs"
                        activeKey={key}
                        onSelect={(k) => setKey(k!)}
                        className="mb-3"
                    >
                        <Tab eventKey="html" title={<><FaHtml5 className="html-icon" /> <strong className="html-icon">HTML</strong></>}>
                            <div style={{ position: "relative" }}>
                                <Editor
                                    height="500px"
                                    language="html"
                                    value={htmlCode}
                                    onChange={(value) => setHtmlCode(value || "")}
                                    theme={isDarkMode ? "vs-dark" : "vs"}
                                    options={{
                                        minimap: { enabled: false },
                                        lineNumbers: "on",
                                        scrollbar: {
                                            vertical: "hidden",
                                            horizontal: "hidden",
                                        },
                                        renderLineHighlight: "all",
                                        overviewRulerLanes: 0,
                                        showFoldingControls: "always",
                                        wordWrap: "on",
                                    }}
                                />
                                {/* Copy to clipboard button */}
                                <Button
                                    variant="outline-primary"
                                    onClick={() => copyToClipboard(htmlCode)}
                                    style={{
                                        position: "absolute",
                                        bottom: "10px",
                                        right: "10px",
                                    }}
                                >
                                    <FaCopy /> <strong>Copy</strong>
                                </Button>
                            </div>
                        </Tab>
                        <Tab eventKey="css" title={<><FaCss3 className="css-icon" /> <strong className="css-icon">CSS</strong></>}>
                            <div style={{ position: "relative" }}>
                                <Editor
                                    height="500px"
                                    language="css"
                                    value={cssCode}
                                    onChange={(value) => setCssCode(value || "")}
                                    theme={isDarkMode ? "vs-dark" : "vs"}
                                    options={{
                                        minimap: { enabled: false },
                                        lineNumbers: "on",
                                        scrollbar: {
                                            vertical: "hidden",
                                            horizontal: "hidden",
                                        },
                                        renderLineHighlight: "all",
                                        overviewRulerLanes: 0,
                                        showFoldingControls: "always",
                                        wordWrap: "on",
                                    }}
                                />
                                <Button
                                    variant="outline-primary"
                                    onClick={() => copyToClipboard(cssCode)}
                                    style={{
                                        position: "absolute",
                                        bottom: "10px",
                                        right: "10px",
                                    }}
                                >
                                    <FaCopy /> <strong>Copy</strong>
                                </Button>
                            </div>
                        </Tab>
                    </Tabs>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Col>
            </Row>

            <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                delay={2000}
                autohide
                className="position-fixed bottom-0 end-0 m-3"
            >
                <Toast.Body>Code copied to clipboard!</Toast.Body>
            </Toast>
        </Container>
    );
};

export default ElementEditorPage;
