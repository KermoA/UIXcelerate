import React, { useState, useEffect } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavbarComponent: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const adminStatus = localStorage.getItem("isAdmin") === "true";
        setIsAdmin(adminStatus);

        const handleStorageChange = () => {
            const adminStatus = localStorage.getItem("isAdmin") === "true";
            setIsAdmin(adminStatus);
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        setIsAdmin(false);
        navigate("/");
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary sticky-top">
            <Navbar.Brand className="ms-3" href="/">UIXcelerate</Navbar.Brand>
            <Navbar.Toggle className="me-3" aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto d-flex align-items-center">
                    <NavDropdown
                        title="Elements"
                        id="basic-nav-dropdown"
                        show={showDropdown}
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                    >
                        <NavDropdown.Item href="/elements">All</NavDropdown.Item>
                        <NavDropdown.Item href="/elements/buttons">Buttons</NavDropdown.Item>
                        <NavDropdown.Item href="/elements/checkboxes">Checkboxes</NavDropdown.Item>
                        <NavDropdown.Item href="/elements/toggles">Toggle switches</NavDropdown.Item>
                        <NavDropdown.Item href="/elements/cards">Cards</NavDropdown.Item>
                        <NavDropdown.Item href="/elements/loaders">Loaders</NavDropdown.Item>
                        <NavDropdown.Item href="/elements/inputs">Inputs</NavDropdown.Item>
                        <NavDropdown.Item href="/elements/radio">Radio buttons</NavDropdown.Item>
                        <NavDropdown.Item href="/elements/forms">Forms</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/contact">Contact</Nav.Link>

                </Nav>
                    {isAdmin && <Nav.Link href="/add-element" className="me-3">Add Element</Nav.Link>}
                {isAdmin && <Nav.Link href="/admin" className="me-3">Dashboard</Nav.Link>}
                {isAdmin && <Nav.Link onClick={handleLogout} className="me-3" style={{ cursor: "pointer", color: "red" }}>Logout</Nav.Link>}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarComponent;
