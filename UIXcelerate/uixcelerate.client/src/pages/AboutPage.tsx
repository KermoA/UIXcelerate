import React from 'react';
import { Container, Row, Col, Card, ListGroup, Button, Image } from 'react-bootstrap';

const AboutPage: React.FC = () => {
    return (
        <Container className="my-5">
            <Row>
                {/* Left Column: Personal Information + Skills */}
                <Col xs={12} md={4} className="mb-4">
                    {/* Personal Information Section */}
                    <Card>
                        <Card.Body className="text-center">
                            <Image
                                src="https://via.placeholder.com/150" // Replace with your actual photo
                                roundedCircle
                                width={150}
                                height={150}
                            />
                            <h3 className="mt-3">Kermo</h3>
                            <p className="text-muted">DevOps Intern | Junior Software Developer</p>
                            <Button variant="primary" href="mailto:kermo@example.com">Contact</Button>
                        </Card.Body>
                    </Card>

                    {/* Skills Section (Moved Below Personal Info) */}
                    <Card className="mt-4">
                        <Card.Body>
                            <Card.Title>Skills</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Languages: C#, HTML, CSS, Python, JavaScript, TypeScript</ListGroup.Item>
                                <ListGroup.Item>Technologies: ASP.NET Core, React, Vue, Angular</ListGroup.Item>
                                <ListGroup.Item>Version Control: Git, GitHub </ListGroup.Item>
                                <ListGroup.Item>Databases: MSSQL, MongoDB, PostgreSQL</ListGroup.Item>
                                <ListGroup.Item>Other: CI/CD, Agile, REST APIs</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Right Column: Experience + Education */}
                <Col xs={12} md={8}>
                    {/* Experience Section */}
                    <Card>
                        <Card.Body>
                            <Card.Title>Work Experience</Card.Title>
                            <h5>DevOps Intern</h5>
                            <p><strong>RIA</strong> | Mar 2025 - Present</p>
                            <ul>
                                <li>Practical learning and use of CI/CD platform tools in the process of resolving ongoing customer inquiries.</li>
                                <li>Analysis of CI/CD platform workflows and, based on the results, optimizing them through automation.</li>
                                <li>Monitoring of the CI/CD platform and making improvements as needed.</li>
                                <li>Creating and updating documentation.</li>
                            </ul>
                        </Card.Body>
                    </Card>

                    {/* Education Section */}
                    <Card className="mt-4">
                        <Card.Body>
                            <Card.Title>Education</Card.Title>
                            <h5>Junior Software Developer</h5>
                            <p><strong>Tallinn Industrial Education Centre</strong> | 2023 - 2025</p>
                            <ul>
                                <li>Graduated with a 5 GPA.</li>
                                <li>Completed coursework in Software Engineering, Algorithms, Data Structures.</li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AboutPage;
