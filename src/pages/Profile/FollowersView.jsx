import { useParams } from 'react-router-dom';
import useFollowersList from '../../hooks/useFollowersList';
import useSelectedProfile from '../../hooks/useSelectedProfile';
import FollowerCard from '../../components/Follower/Follower';
import { Button, Stack } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const FollowersView = () => {
    const { profileId } = useParams();
    const profileData = useSelectedProfile();
    const { followers, loading, pagination, handleNextPage, handlePrevPage } = useFollowersList(profileId);

    if (loading || profileData.loading) {
        return <div>Loading...</div>;
    } else {

        return (
            <div className="p-3">
                <h2>{profileData.profile.firstName}&apos;s Followers</h2>
                {followers && followers.length > 0 ? (
                    followers.map((follower) => (<FollowerCard key={follower.profileId} {...follower} />))
                ) : (<p>No followers yet.</p>)}
                <Stack direction="horizontal" gap={3}>
                    {pagination.previousPage && <Button className='' onClick={handlePrevPage}><FontAwesomeIcon icon={faArrowLeft} /> Previous page</Button>}
                    {pagination.nextPage && <Button className='ms-auto' onClick={handleNextPage}>Next page <FontAwesomeIcon icon={faArrowRight} /></Button>}
                </Stack>
            </div>
        );
    };
}

export default FollowersView;
