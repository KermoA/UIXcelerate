import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavbarComponent: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
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
                    <Nav.Link href="/elements">Elements</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                </Nav>
                {isAdmin && (
                    <Nav className="d-flex">
                        <Nav.Link href="/add-element" className="me-3">Add Element</Nav.Link>
                        <Nav.Link href="/admin" className="me-3">Dashboard</Nav.Link>
                        <Nav.Link onClick={handleLogout} className="me-3" style={{ cursor: "pointer", color: "red" }}>
                            Logout
                        </Nav.Link>
                    </Nav>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarComponent;
