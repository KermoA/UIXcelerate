import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddElementForm: React.FC = () => {
    const [name, setName] = useState("");
    const [htmlCode, setHtmlCode] = useState("");
    const [cssCode, setCssCode] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

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

    return (
        <div className="container">
            <h2>Add a New UI Element</h2>
            <Form onSubmit={handleSubmit}>
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

                <Form.Group className="mb-3" controlId="formElementHtmlCode">
                    <Form.Label>HTML Code</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Enter HTML code"
                        value={htmlCode}
                        onChange={(e) => setHtmlCode(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formElementCssCode">
                    <Form.Label>CSS Code</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Enter CSS code"
                        value={cssCode}
                        onChange={(e) => setCssCode(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formElementCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter element category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Element
                </Button>
            </Form>
        </div>
    );
};

export default AddElementForm;
