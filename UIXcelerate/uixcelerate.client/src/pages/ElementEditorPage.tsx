import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import Editor from "@monaco-editor/react";

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
        // Implement logic to save changes
    };

    // This effect will update the preview whenever htmlCode or cssCode changes
    useEffect(() => {
        // You can perform any additional actions if needed when htmlCode or cssCode changes
    }, [htmlCode, cssCode]);

    if (!element) {
        return <div>Loading...</div>;
    }

    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={6}>
                    <h2>Element Preview</h2>
                    {/* Update preview dynamically with current htmlCode and cssCode */}
                    <div
                        dangerouslySetInnerHTML={{
                            __html: htmlCode,
                        }}
                    ></div>
                    <style>{cssCode}</style>
                </Col>
                <Col xs={12} md={6}>
                    <h2>Edit Element</h2>
                    <div>
                        <h4>HTML</h4>
                        <Editor
                            height="300px"
                            language="html"
                            value={htmlCode}
                            onChange={(value) => setHtmlCode(value || "")}
                            theme={isDarkMode ? "vs-dark" : "vs"}
                        />
                    </div>
                    <div>
                        <h4>CSS</h4>
                        <Editor
                            height="300px"
                            language="css"
                            value={cssCode}
                            onChange={(value) => setCssCode(value || "")}
                            theme={isDarkMode ? "vs-dark" : "vs"}
                        />
                    </div>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ElementEditorPage;
