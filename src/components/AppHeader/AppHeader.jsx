import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fade, Stack } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

import useSelectedProfile from '../../hooks/useSelectedProfile'
import NavBar from '../NavBar/NavBar'
import styles from './AppHeader.module.css'

const AppHeader = () => {
    const { profile, loading } = useSelectedProfile()

    const title =
        !loading && profile ? (
            <h1 className="">
                {`${profile.firstName || ''}${profile.lastName ? ' ' + profile.lastName : ''}`}
                <span className="d-none d-sm-inline">&apos;s</span>
            </h1>
        ) : (
            ''
        )

    return (
        <>
            <header className={`App-header ${styles['App-header']}`}>
                <Fade in={!loading}>
                    <Stack direction="horizontal" gap={2}>
                        <FontAwesomeIcon
                            icon={faStroopwafel}
                            size="3x"
                            className="icons"
                        />
                        {title}
                        {/* Hides 'StitchSpace' on small screens if the user's name is in the title */}
                        <h1 className={title && 'd-none d-sm-inline'}>
                            Stitch Space
                        </h1>
                        {/* Only render the tagline when the user's name is not in the title */}
                        {!title && (
                            <h2 className={`d-none d-md-inline text-truncate`}>
                                - the fibre art community
                            </h2>
                        )}
                    </Stack>
                </Fade>
                <NavBar />
            </header>
            <Outlet />
        </>
    )
}

export default AppHeader
