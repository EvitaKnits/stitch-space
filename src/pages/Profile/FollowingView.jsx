import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Stack } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

import FollowerCard from '../../components/Follower/Follower'
import useFollowingList from '../../hooks/useFollowingList'
import useSelectedProfile from '../../hooks/useSelectedProfile'

const FollowingView = () => {
    const { profileId } = useParams()
    const profileData = useSelectedProfile()
    const { followers, loading, pagination, handleNextPage, handlePrevPage } =
        useFollowingList(profileId)

    if (loading || profileData.loading) {
        return <div>Loading...</div>
    } else {
        return (
            <div className="p-3">
                <h2>{profileData.profile.firstName} Follows</h2>
                {followers && followers.length > 0 ? (
                    followers.map((follower) => (
                        <FollowerCard key={follower.profileId} {...follower} />
                    ))
                ) : (
                    <p>Not following anyone yet.</p>
                )}
                <Stack direction="horizontal" gap={3}>
                    {pagination.previousPage && (
                        <Button className="" onClick={handlePrevPage}>
                            <FontAwesomeIcon icon={faArrowLeft} /> Previous page
                        </Button>
                    )}
                    {pagination.nextPage && (
                        <Button className="ms-auto" onClick={handleNextPage}>
                            Next page <FontAwesomeIcon icon={faArrowRight} />
                        </Button>
                    )}
                </Stack>
            </div>
        )
    }
}

export default FollowingView
