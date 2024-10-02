import { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Image, Ratio, Row } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'

import axiosClient from '../../api/axiosDefaults'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import useSelectedProfile from '../../hooks/useSelectedProfile'
import ProfileEdit from './ProfileEdit'

const Profile = () => {
    const userContext = useContext(CurrentUserContext)
    const { isAuthUserProfile, profile, loading, selectedProfile, setRefresh } =
        useSelectedProfile()
    const [editMode, setEditMode] = useState(false)
    const [authUserIsFollowing, setAuthUserIsFollowing] = useState(false)

    const handleEditClick = () => {
        setEditMode(true)
    }

    const handleEditCancel = () => {
        setEditMode(false)
    }

    const handleEditSubmit = () => {
        setRefresh(true)
        setEditMode(false)
    }

    // Determine the follow button state
    useEffect(() => {
        const checkIfFollowing = async () => {
            try {
                const response = await axiosClient.get(
                    `/profile/${selectedProfile}/followers/`,
                    {
                        params: {
                            follower__owner_id: userContext.currentUser.pk,
                        },
                    }
                )
                setAuthUserIsFollowing(response.data.count > 0)
            } catch (err) {
                console.log(err.response?.data)
            }
        }
        if (!userContext.loading && userContext.currentUser) checkIfFollowing()
    }, [userContext.currentUser, userContext.loading, selectedProfile])

    const handleFollow = async () => {
        try {
            await axiosClient.post(`/profile/${selectedProfile}/followers/add/`)
            setAuthUserIsFollowing(true)
        } catch (err) {
            console.log(err.response?.data)
        }
    }

    const handleUnfollow = async () => {
        try {
            await axiosClient.delete(
                `/profile/${selectedProfile}/followers/remove/`
            )
            setAuthUserIsFollowing(false)
        } catch (err) {
            console.log(err.response?.data)
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    const formattedDate = profile?.createdAt
        ? formatDate(profile.createdAt)
        : 'Unknown Date';

    return loading || !profile ? (
        ''
    ) : (
        <Container fluid className="mt-3">
            <Row>
                <Col sm={12} md={3}>
                    <div>
                        <Row className="justify-content-center">
                            <Col xs={9} md={12}>
                                <Ratio aspectRatio="1x1">
                                    <Image src={profile.image} rounded  alt='profile picture'/>
                                </Ratio>
                            </Col>
                        </Row>
                        {editMode ? (
                            // Render ProfileEdit Component in Edit Mode
                            <ProfileEdit
                                profile={profile}
                                onCancel={handleEditCancel}
                                onEdit={handleEditSubmit}
                            />
                        ) : (
                            <>
                                <Row className="p-2">
                                    <Col xs={12}>
                                        <h2>
                                            {profile.firstName}{' '}
                                            {profile.lastName}
                                        </h2>
                                        <p>
                                            Stitcher Since {formattedDate}
                                        </p>
                                        <p>
                                            Creator of {profile.pieces} pieces
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <div>{profile.biography}</div>
                                </Row>
                                <Row className="p-2">
                                    {authUserIsFollowing ? (
                                        <Button
                                            variant="secondary"
                                            disabled={isAuthUserProfile}
                                            onClick={handleUnfollow}
                                        >
                                            Unfollow
                                        </Button>
                                    ) : (
                                        <Button
                                            disabled={isAuthUserProfile}
                                            onClick={handleFollow}
                                        >
                                            Follow
                                        </Button>
                                    )}
                                </Row>
                                <Row className="p-2">
                                    <Button as={Link} to="./followers">
                                        Followers: {profile.followers}
                                    </Button>
                                </Row>
                                <Row className="p-2">
                                    <Button as={Link} to="./following">
                                        Following: {profile.is_following}
                                    </Button>
                                </Row>
                            </>
                        )}
                    </div>
                    {/* Edit Button for Authenticated User */}
                    {isAuthUserProfile && !editMode && (
                        <Row className="p-2">
                            <Col xs={12}>
                                <Button
                                    variant="primary"
                                    onClick={handleEditClick}
                                >
                                    Edit Profile
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Col>
                <Col md={1}>
                    <div className="vr h-100 d-none d-md-block"></div>
                    <hr className="d-block d-md-none" />
                </Col>
                <Col sm={12} md={8}>
                    <div>
                        {/* Child Routes */}
                        <Outlet />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Profile
