import { useState } from 'react';
import { Button, Container, Image, Row, Col, Ratio } from "react-bootstrap";
import { Link, Outlet } from 'react-router-dom';
import useSelectedProfile from "../../hooks/useSelectedProfile";
import ProfileEdit from './ProfileEdit';

const Profile = () => {
    const { isAuthUserProfile, profile, loading } = useSelectedProfile();
    const [editMode, setEditMode] = useState(false);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleEditCancel = () => {
        setEditMode(false);
    };

    return loading ? '' : (
        <Container fluid className="mt-3" >
            <Row>
                <Col sm={12} md={3}>
                    <div>
                        <Row className="justify-content-center">
                            <Col xs={9} md={12}>
                                <Ratio aspectRatio="1x1">
                                    <Image src={profile.image} rounded />
                                </Ratio>
                            </Col>
                        </Row>
                        {editMode ? (
                            // Render ProfileEdit Component in Edit Mode
                            <ProfileEdit profile={profile} onCancel={handleEditCancel} />
                        ) : (
                            <>
                                <Row className="p-2">
                                    <Col xs={12}>
                                        <h4>{profile.firstName} {profile.lastName}</h4>
                                        <p>Stitcher Since: {profile.createdAt}</p>
                                        <p>Creator of xx pieces</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <div>{profile.biography}</div>
                                </Row>
                                <Row className="p-2">
                                        <Button disabled={isAuthUserProfile}>Follow</Button>
                                </Row>
                                <Row className="p-2">
                                        <Button as={Link} to='./followers'>Followers: xx</Button>
                                </Row>
                                <Row className="p-2">
                                        <Button as={Link} to='./following'>Following: xx</Button>
                                </Row>
                            </>
                        )}
                    </div>
                    {/* Edit Button for Authenticated User */}
                    {isAuthUserProfile && !editMode && (
                            <Row className="p-2">
                                <Col xs={12}>
                                    <Button variant="primary" onClick={handleEditClick}>Edit Profile</Button>
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
    );
};

export default Profile;
