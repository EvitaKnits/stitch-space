import { useState } from 'react';
import { Button, Form, Container, Row, Col, FloatingLabel } from 'react-bootstrap';

const PiecesEdit = ({ piece, onCancel }) => {
    const [formData, setFormData] = useState({
        title: piece.title || '',
        artType: piece.artType || '',
        createdDate: piece.createdDate || '',
        image: piece.image || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement API call to update the piece
        console.log('Updated piece data:', formData);
        // Exit edit mode after saving
        onCancel();
    };

    return (
        <Container>
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
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <FloatingLabel controlId="formArtType" label="Art Type">
                            <Form.Control
                                type="text"
                                name="artType"
                                value={formData.artType}
                                onChange={handleChange}
                                placeholder="Art Type"
                            />
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
                    />
                </FloatingLabel>
                {/* Add other fields as needed */}
                <Button variant="primary" type="submit">Save Changes</Button>{' '}
                <Button variant="secondary" onClick={onCancel}>Cancel</Button>
            </Form>
        </Container>
    );
};

export default PiecesEdit;