import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import backgroundImage from "./bgImg.jpg"; // Replace with the actual path

const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "89.7vh", // Set the height to full viewport height
    display: "flex",
    alignItems: "center",
};

const boldFontStyle = {
    fontWeight: "bold",
};



const Index = () => {
    return (
        <Container fluid >
            <Row className="justify-content-center" style={backgroundStyle}>
                <Col className="text-center text-light">
                    <h1 className="display-1" style={boldFontStyle}>Emotibook</h1>
                </Col>
            </Row>
        </Container>
    );
};

export default Index;
