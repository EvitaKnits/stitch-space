import { Button, Container, Image, Row, Col, Ratio } from "react-bootstrap";
import { Link, Outlet } from 'react-router-dom';
import useSelectedProfile from "../../hooks/useSelectedProfile";

const Profile = () => {
    const { isAuthUserProfile, profile, loading } = useSelectedProfile();

    return loading ? '' : (<Container fluid className="mt-3" >
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
                    <Row className="p-2">
                        <Col xs={12}>Stitcher Since: {profile.createdAt}</Col>
                        {/* Disable the button if the user is viewing their own profile */}
                        <Col><Button disabled={isAuthUserProfile}>Follow</Button></Col>
                        </Row>
                    <Row>
                        <div>{profile.biography}</div>
                    </Row>
                    <Row className="p-2">
                        <Col>Pieces: xxx</Col>
                        <Col>
                            <Link to='./followers'>Followers: xxx</Link><br />
                            <Link to='./following'>Following: xxx</Link>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col md={1}><div className="vr h-100 d-none d-md-block"></div><hr className="d-block d-md-none" /></Col>
            <Col sm={12} md={8}>
                <div>
                    {/* Allows wrapping of child Routes in the Router for List and Detail views */}
                    <Outlet />
                </div>
            </Col>
        </Row>
    </Container>);
};

export default Profile;