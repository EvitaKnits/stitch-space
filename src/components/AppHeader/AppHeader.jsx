import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../NavBar/NavBar';
import styles from './AppHeader.module.css'
import { Stack } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import useSelectedProfile from '../../hooks/useSelectedProfile';

const AppHeader = () => {
    const {
        profile,
        loading
    } = useSelectedProfile();

    const title = (!loading && profile)
        ? (<h1 className=''>{`${profile.firstName || ''}${profile.lastName ? ' ' + profile.lastName : ''}`}
            <span className='d-none d-sm-inline'>&apos;s</span>
        </h1>) : ''

    return (
        <>
            <header className={`App-header ${styles['App-header']}`}>
                <Stack direction='horizontal' gap={2}>
                    <FontAwesomeIcon icon={faStroopwafel} size='3x' className='icons' />
                    {title}
                    {/* Hides 'StitchSpace' on small screens if the user's name is in the title */}
                    <h1 className={title && 'd-none d-sm-inline'}>Stitch Space</h1>
                    {/* Hides the tagline on different breakpoints depending on whether the user's name is in the title */}
                    <h2 className={`d-none ${title ? 'd-lg-inline' : 'd-md-inline'} text-truncate`}>- the fibre art community</h2>
                </Stack>
                <NavBar />
            </header>
            <Outlet />
        </>
    )
}

export default AppHeader