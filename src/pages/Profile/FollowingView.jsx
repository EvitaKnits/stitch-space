import { useParams } from 'react-router-dom';
import useFollowingList from '../../hooks/useFollowingList';
import useSelectedProfile from '../../hooks/useSelectedProfile';
import FollowerCard from '../../components/Follower/Follower';

const FollowingView = () => {
    const { profileId } = useParams();
    const profileData = useSelectedProfile();
    const { followers, loading } = useFollowingList(profileId);

    if (loading || profileData.loading) {
        return <div>Loading...</div>;
    } else {

        return (
            <div className="p-3">
                <h2>{profileData.profile.firstName} Follows</h2>
                {followers && followers.length > 0 ? (
                    followers.map((follower) => (
                        <FollowerCard key={follower.id} {...follower} />
                    ))
                ) : (
                    <p>Not following anyone yet.</p>
                )}
            </div>
        );
    };
}

export default FollowingView;
