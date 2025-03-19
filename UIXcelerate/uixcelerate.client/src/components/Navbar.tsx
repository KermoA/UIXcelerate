import React, { useState } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavbarComponent: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    return (
        <Navbar expand="lg" className="bg-body-tertiary sticky-top">
            <Navbar.Brand className="ms-3" href="/">UIXcelerate</Navbar.Brand>
            <Navbar.Toggle className="me-3" aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {/* Add d-flex and align-items-center */}
                <Nav className="me-auto d-flex align-items-center">
                    <Nav.Link onClick={() => navigate('/elements')}>
                        <NavDropdown
                            title="Elements"
                            id="basic-nav-dropdown"
                            show={showDropdown}
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <NavDropdown.Item href="/elements/buttons">Buttons</NavDropdown.Item>
                            <NavDropdown.Item href="/elements/checkboxes">Checkboxes</NavDropdown.Item>
                            <NavDropdown.Item href="/elements/toggles">Toggle switches</NavDropdown.Item>
                            <NavDropdown.Item href="/elements/cards">Cards</NavDropdown.Item>
                            <NavDropdown.Item href="/elements/loaders">Loaders</NavDropdown.Item>
                            <NavDropdown.Item href="/elements/inputs">Inputs</NavDropdown.Item>
                            <NavDropdown.Item href="/elements/radio">Radio buttons</NavDropdown.Item>
                            <NavDropdown.Item href="/elements/forms">Forms</NavDropdown.Item>
                        </NavDropdown>
                    </Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/contact">Contact</Nav.Link>
                    <Nav.Link href="/add-element">Add Element</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavbarComponent;
