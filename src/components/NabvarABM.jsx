import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../styles/NabvarABM.css"
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

const NabvarABM = ({ setSearchTerm }) => {
  const [searchTermCurrently, setSearchTermCurrently] = useState('');
  const [currentRoute, setCurrentRoute] = useState('/');
  const location = useLocation();

  const links = [
  {
    name: "Employees",
    href: "/"
  },
  {
    name: "Departments",
    href: "/departments"
  },
];

  useEffect(() => {
    setCurrentRoute(location.pathname);
  },[location])

  useEffect(() => {
    setSearchTerm(searchTermCurrently)
  }, [searchTermCurrently])

  return(
    <>
      <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            {
              links.map((link => (
                <Nav.Link 
                  href={link.href} 
                  key={link.href}
                  style={{color: currentRoute === link.href ? '#E6A60A' : 'grey' }}
                >
                  {link.name}
                </Nav.Link>

              )))
            }
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="🔍 Name..."
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearchTermCurrently(e.target.value)}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar> 
    </>
  );
}

export default NabvarABM;