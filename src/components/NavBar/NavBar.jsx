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
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/feed">Feed</Nav.Link>
                        <Nav.Link href="/explore">Explore</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <NavDropdown title={
                            <>
                                <FontAwesomeIcon icon={faUser} className='icons' />
                            </>
                        } id="user-nav-dropdown">
                            <NavDropdown.Item href="/mystitchspace">My Stitch Space</NavDropdown.Item>
                            <NavDropdown.Item href="/userdetails">User Details</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/login">Logout</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title={
                            <>
                                <FontAwesomeIcon icon={faBell} className='icons'/>
                            </>
                        } id="notifications-nav-dropdown">
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;