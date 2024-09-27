import { useContext, useState } from 'react';
import { Button, Form, Container, Row, Col, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useSelectedProfile from '../../hooks/useSelectedProfile';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import axiosClient from '../../api/axiosDefaults';

const PiecesCreate = () => {
    const { currentUser, loading } = useContext(CurrentUserContext)
    const [formData, setFormData] = useState({
        title: '',
        artType: '',
        image: ''
    });

    const { selectedProfile } = useSelectedProfile();

    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const createPiece = async () => {
            try {
                await axiosClient.post(`pieces/create/`, { ...formData, profile: currentUser.pk });
                // Navigate back to the pieces list
                navigate(`/profile/${selectedProfile}`);
            } catch (err) {
                console.log(err.response?.data);
            }
        }
        if (!loading && currentUser) createPiece();
    };

    const handleCancel = () => {
        // Navigate back to the pieces list or previous page
        navigate(-1);
    };

    return (
        <Container>
            <h2>Create a New Piece</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col>
                        <FloatingLabel controlId="formTitle" label="Title">
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Title"
                                required
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <FloatingLabel controlId="formArtType" label="Art Type">
                            <Form.Select
                                name="artType"
                                value={formData.artType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Art Type</option>
                                <option value="knitting">Knitting</option>
                                <option value="embroidery">Embroidery</option>
                                <option value="crochet">Crochet</option>
                                <option value="weaving">Weaving</option>
                                <option value="dyeing">Dyeing</option>
                                <option value="other">Other</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>
                <FloatingLabel controlId="formImage" label="Image URL" className="mb-3">
                    <Form.Control
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                        required
                    />
                </FloatingLabel>
                <Button variant="primary" type="submit">Create Piece</Button>{' '}
                <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
            </Form>
        </Container>
    );
};

export default PiecesCreate;
