import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/Footer.css';

const Footer = ({ footerText }) => {
  return (
    <footer className="mt-auto py-3">
      <Container>
        <Row>
          <Col>
            <p className="mb-0 text-center">
              <img src="/icon-database.svg" sizes='10px' alt="Icono de base de datos" />
                {footerText}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;