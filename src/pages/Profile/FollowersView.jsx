import { useParams } from 'react-router-dom';
import useFollowersList from '../../hooks/useFollowersList';
import useSelectedProfile from '../../hooks/useSelectedProfile';
import FollowerCard from '../../components/Follower/Follower';

const FollowersView = () => {
    const { profileId } = useParams();
    const profileData = useSelectedProfile();
    const { followers, loading } = useFollowersList(profileId);

    if (loading || profileData.loading) {
        return <div>Loading...</div>;
    } else {

        return (
            <div className="p-3">
                <h2>{profileData.profile.firstName}&apos;s Followers</h2>
                {followers && followers.length > 0 ? (
                    followers.map((follower) => (
                        <FollowerCard key={follower.id} {...follower} />
                    ))
                ) : (
                    <p>No followers yet.</p>
                )}
            </div>
        );
    };
}

export default FollowersView;
