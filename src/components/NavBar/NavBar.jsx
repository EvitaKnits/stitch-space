import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from "./NavBar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
// import { axiosClient } from '../api/axiosDefaults';

const NavBar = () => {
    return (
        <Navbar expand="lg" className={styles.NavBar}>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#feed">Feed</Nav.Link>
                        <Nav.Link href="#explore">Explore</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <NavDropdown title={
                            <>
                                <FontAwesomeIcon icon={faBell} className='icons'/>
                            </>
                        } id="notifications-nav-dropdown">
                        </NavDropdown>
                        <NavDropdown title={
                            <>
                                <FontAwesomeIcon icon={faUser} className='icons' />
                            </>
                        } id="user-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">My Stitch Space</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">User Details</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.3">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;