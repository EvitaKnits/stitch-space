import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from "./NavBar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { NavItem } from 'react-bootstrap';
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
                        <Dropdown as={NavItem} className={`ms-1`}>
                            <Dropdown.Toggle className={styles.NavDropdownButton}>
                                <FontAwesomeIcon icon={faUser} className='icons' />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/mystitchspace" className={styles.NavDropdownItem}>My Stitch Space</Dropdown.Item>
                                <Dropdown.Item href="/userdetails" className={styles.NavDropdownItem}>User Details</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="/login" className={styles.NavDropdownItem}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown as={NavItem} className={`ms-1`}>
                            <Dropdown.Toggle className={styles.NavDropdownButton}>
                                <FontAwesomeIcon icon={faBell} className='icons'/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item className={styles.NavDropdownItem}>Placeholder</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;