import { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from "./NavBar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { NavItem, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const NavBar = () => {
    const { currentUser, logOut } = useContext(CurrentUserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut();
        navigate('/login')
    }

    return (<Stack direction="horizontal" className={`${styles.NavBar} align-items-baseline`}>
        <Navbar collapseOnSelect expand="lg" className={`me-auto`}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    {/* The Feed and Explore pages are only displayed to logged-in users */}
                    {currentUser && (
                            <>
                                <Nav.Link href="/feed">Feed</Nav.Link>
                                <Nav.Link href="/explore">Explore</Nav.Link>
                            </>
                        )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <Nav className={`justify-content-end`}>
            <Dropdown as={NavItem} className={`m-1`}>
                <Dropdown.Toggle className={styles.NavDropdownButton} size="lg">
                    <FontAwesomeIcon icon={faUser} className='icons' />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {/* Shows only appropriate options when logged in/out */}
                    {currentUser ?
                        (<>
                            <Dropdown.Item href={`/profile/${currentUser.pk}`} className={styles.NavDropdownItem}>My Stitch Space</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogout} className={styles.NavDropdownItem}>Logout</Dropdown.Item>
                        </>) : (<>
                            <Dropdown.Item href='/login' className={styles.NavDropdownItem}>Login</Dropdown.Item>
                            <Dropdown.Item href='/register' className={styles.NavDropdownItem}>Sign Up</Dropdown.Item>
                        </>)}
                </Dropdown.Menu>
            </Dropdown>
            {currentUser && (
            <Dropdown as={NavItem} className={`m-1`}>
                <Dropdown.Toggle className={styles.NavDropdownButton} size="lg">
                    <FontAwesomeIcon icon={faBell} className='icons' />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item className={styles.NavDropdownItem}>Placeholder</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            )}
        </Nav>
    </Stack>
    );
};

export default NavBar;