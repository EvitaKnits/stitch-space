import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../NavBar/NavBar';
import styles from './AppHeader.module.css'
import { Stack } from 'react-bootstrap';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { matchRoutes, useLocation, Outlet } from 'react-router-dom';


const AppHeader = () => {
    const { currentUser } = useContext(CurrentUserContext);
    let title = null
    const routes = [{ path: "/mystitchspace" }]
    const location = useLocation()
    const matchedRoutes = matchRoutes(routes, location)
    // Adds the name of the user logged in, to their MyStitchSpace page title
    if (currentUser && matchedRoutes) {
        title = currentUser && `${currentUser.first_name || ''}${currentUser.last_name ? ' ' + currentUser.last_name : ''}'s`
    }

    return (
        <>
            <header className={`App-header ${styles['App-header']}`}>
                <Stack direction='horizontal' gap={2}>
                    <FontAwesomeIcon icon={faStroopwafel} size='3x' className='icons' />
                    {title && <h1 className=''>{title}</h1>}
                    {/* Hides 'StitchSpace' on small screens if the user's name is in the title */}
                    <h1 className={currentUser && 'd-none d-sm-inline'}>Stitch Space</h1>
                    {/* Hides the tagline on different breakpoints depending on whether the user's name is in the title */}
                    <h2 className={`d-none ${title ? 'd-lg-inline' : 'd-md-inline'}`}>- the fibre art community</h2>
                </Stack>
                <NavBar />
            </header>
            <Outlet />
        </>
    )
}

export default AppHeader