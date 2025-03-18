import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';

const ElementsPage: React.FC = () => {
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
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ElementsPage;
