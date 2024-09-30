import { useState } from 'react'
import {
    Button,
    Col,
    Container,
    FloatingLabel,
    Form,
    Row,
} from 'react-bootstrap'

import axiosClient from '../../api/axiosDefaults'

const PiecesEdit = ({ piece, onCancel, onEdit }) => {
    const [formData, setFormData] = useState({
        title: piece.title || '',
        artType: piece.artType || '',
        image: piece.image || '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const editPiece = async () => {
            try {
                await axiosClient.patch(`pieces/${piece.id}/`, { ...formData })
                // Close the edit view
                onEdit()
            } catch (err) {
                console.log(err.response?.data)
            }
        }
        editPiece()
    }

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
                <FloatingLabel
                    controlId="formImage"
                    label="Image URL"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                    />
                </FloatingLabel>
                {/* Add other fields as needed */}
                <Button variant="primary" type="submit">
                    Save Changes
                </Button>{' '}
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
            </Form>
        </Container>
    )
}

export default PiecesEdit
