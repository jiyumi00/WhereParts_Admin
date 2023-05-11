import React, {Component} from 'react';
import {Navbar, Container, Nav } from 'react-bootstrap';
// import '../css/TopPage.css';
import '../styles/menu.css';
import { Link } from 'react-router-dom';
export default class TopTemplate extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <Navbar bg="light" variant="light">
          <Navbar.Brand href='/' style={{ color: '#0066FF', marginLeft: '18px' }}>LogoImage</Navbar.Brand>
          <Container>
            <Nav className="me-auto"></Nav>
            <Nav className="ms-auto">
              <Link to="/Login">Logout</Link>
              {/* <Nav.Link href='/'>Login</Nav.Link> */}
            </Nav>
          </Container>
        </Navbar>
        );
    }
}

