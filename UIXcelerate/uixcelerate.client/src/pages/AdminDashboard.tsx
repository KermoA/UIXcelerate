import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface UiElement {
    id: number;
    name: string;
    category: string;
}

const AdminDashboard: React.FC = () => {
    const [elements, setElements] = useState<UiElement[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://localhost:7168/api/elements")
            .then((res) => res.json())
            .then((data) => setElements(data));
    }, []);

    const handleDelete = async (id: number) => {
        await fetch(`https://localhost:7168/api/elements/${id}`, { method: "DELETE" });
        setElements(elements.filter((el) => el.id !== id));
    };

    return (
        <Container>
            <h2>Admin Dashboard</h2>
            <Row>
                {elements.map((el) => (
                    <Col key={el.id} xs={12} md={6}>
                        <div className="admin-card">
                            <h4>{el.name}</h4>
                            <p>Category: {el.category}</p>
                            <Button variant="primary" onClick={() => navigate(`/element-editor/${el.id}`)}>Edit</Button>
                            <Button variant="danger" onClick={() => handleDelete(el.id)}>Delete</Button>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AdminDashboard;
