import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar p-3">
            <Nav defaultActiveKey="/elements" className="flex-column">
                <Nav.Link as={Link} to="/elements/buttons">Buttons</Nav.Link>
                <Nav.Link as={Link} to="/elements/checkboxes">Checkboxes</Nav.Link>
                <Nav.Link as={Link} to="/elements/toggles">Toggle switches</Nav.Link>
                <Nav.Link as={Link} to="/elements/cards">Cards</Nav.Link>
                <Nav.Link as={Link} to="/elements/loaders">Loaders</Nav.Link>
                <Nav.Link as={Link} to="/elements/inputs">Inputs</Nav.Link>
                <Nav.Link as={Link} to="/elements/radio">Radio buttons</Nav.Link>
                <Nav.Link as={Link} to="/elements/forms">Forms</Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;