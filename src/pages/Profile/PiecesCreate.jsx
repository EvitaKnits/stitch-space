import { useState } from 'react';
import { Button, Form, Container, Row, Col, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Piece from '../../components/Piece/Piece';
import useSelectedProfile from '../../hooks/useSelectedProfile';

const PiecesCreate = () => {
    const [formData, setFormData] = useState({
        title: '',
        artType: '',
        imageUrl: '',
    });

    const {selectedProfile, isAuthUserProfile, loading} = useSelectedProfile();

    const navigate = useNavigate();

    if (!loading && !isAuthUserProfile){
        navigate(-1)
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create a new Piece instance using the form data
        const newPiece = new Piece({
            id: Date.now(),
            title: formData.title,
            artType: formData.artType,
            imageUrl: formData.imageUrl,
            userId: parseInt(selectedProfile, 10),
            userName: 'Mock User',
            rating: 0,
        });

        console.log('New piece created:', newPiece);

        // Navigate back to the pieces list
        navigate(`/profile/${selectedProfile}`);
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
                <FloatingLabel controlId="formImageUrl" label="Image URL" className="mb-3">
                    <Form.Control
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
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
