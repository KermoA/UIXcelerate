import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

const NavbarComponent: React.FC = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary sticky-top">
            <Navbar.Brand className="ms-3" href="#home">UIXcelerate</Navbar.Brand>
            <Navbar.Toggle className="me-3" aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Elements" id="basic-nav-dropdown">
                            <NavDropdown.Item href="">Buttons</NavDropdown.Item>
                            <NavDropdown.Item href="">Checkboxes</NavDropdown.Item>
                            <NavDropdown.Item href="">Toggle switches</NavDropdown.Item>
                            <NavDropdown.Item href="">Cards</NavDropdown.Item>
                            <NavDropdown.Item href="">Loaders</NavDropdown.Item>
                            <NavDropdown.Item href="">Inputs</NavDropdown.Item>
                            <NavDropdown.Item href="">Radio buttons</NavDropdown.Item>
                            <NavDropdown.Item href="#">Forms</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="">About</Nav.Link>
                        <Nav.Link href="">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
}

export default NavbarComponent;
