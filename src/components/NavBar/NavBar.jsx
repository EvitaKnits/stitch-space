import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { NavItem, Stack } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import NotificationsDropdown from '../NotificationsDropdown/NotificationsDropdown'
import styles from './NavBar.module.css'

const NavBar = () => {
    const { currentUser, logOut } = useContext(CurrentUserContext)
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        logOut()
        navigate('/login')
    }

    const isActive = (path) => location.pathname === path

    return (
        <Stack
            direction="horizontal"
            className={`${styles.NavBar} align-items-baseline`}
        >
            <Navbar collapseOnSelect expand="lg" className={`me-auto`}>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className={isActive('/') ? styles.activeLink : ''}>Home</Nav.Link>
                        {/* The Feed and Explore pages are only displayed to logged-in users */}
                        {currentUser && (
                            <>
                                <Nav.Link as={Link} to="/feed" className={isActive('/feed') ? styles.activeLink : ''}>Feed</Nav.Link>
                                <Nav.Link as={Link} to="/explore" className={isActive('/explore') ? styles.activeLink : ''}>Explore</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Nav className={`justify-content-end`}>
                <Dropdown as={NavItem} className={`m-1`}>
                    <Dropdown.Toggle
                        className={styles.NavDropdownButton}
                        size="lg"
                    >
                        <FontAwesomeIcon icon={faUser} className="icons" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {/* Shows only appropriate options when logged in/out */}
                        {currentUser ? (
                            <>
                                <Dropdown.Item
                                    as={Link}
                                    to={`/profile/${currentUser.pk}`}
                                    className={styles.NavDropdownItem}
                                >
                                    My Stitch Space
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item
                                    onClick={handleLogout}
                                    className={styles.NavDropdownItem}
                                >
                                    Logout
                                </Dropdown.Item>
                            </>
                        ) : (
                            <>
                                <Dropdown.Item
                                    as={Link}
                                    to="/login"
                                    className={styles.NavDropdownItem}
                                >
                                    Login
                                </Dropdown.Item>
                                <Dropdown.Item
                                    as={Link}
                                    to="/register"
                                    className={styles.NavDropdownItem}
                                >
                                    Sign Up
                                </Dropdown.Item>
                            </>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                {currentUser && <NotificationsDropdown />}
            </Nav>
        </Stack>
    )
}

export default NavBar
