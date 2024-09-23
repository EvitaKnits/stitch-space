import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from "./About.module.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";


const About = () => {
    const userContext = useContext(CurrentUserContext)
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate("/register");
    };

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Card className={styles.About}>
                <Card.Body>
                    <Card.Title>About</Card.Title>
                    <Card.Text>
                        Stitch Space is the online community for fibre artists to connect, share, and celebrate their craft. Here, artists can showcase their portfolios, displaying
                        their unique creations to a supportive audience of peers who share a passion for the art of fibre. Whether you&apos;re a weaver, knitter, embroiderer, or any other
                        type of fibre artist, Stitch Space provides a platform to not only exhibit your work but also to engage with a vibrant community. Discover inspiration, exchange
                        techniques, and participate in meaningful conversations that help elevate your skills and expand your creative horizons. Join us and become part of a thriving
                        network of artists dedicated to the art of fibre.
                    </Card.Text>
                    {/* Only display sign up button if not signed in */}
                    {!userContext.currentUser && (
                        <div className="d-flex justify-content-center">
                            <Button className={styles.SignUpButton} onClick={handleSignUpClick}>Sign Up</Button>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default About;