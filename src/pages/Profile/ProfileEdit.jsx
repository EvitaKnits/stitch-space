import { useState } from 'react'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap'

import axiosClient from '../../api/axiosDefaults'

const ProfileEdit = ({ profile, onCancel, onEdit }) => {
    const [formData, setFormData] = useState({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        biography: profile.biography || '',
        image: profile.image || '',
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

        const editProfile = async () => {
            try {
                await axiosClient.patch(`profile/${profile.id}/`, {
                    ...formData,
                })
                // Close the edit view
                onEdit()
            } catch (err) {
                console.log(err.response?.data)
            }
        }
        editProfile()
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3 mt-3">
                <Col>
                    <FloatingLabel controlId="formFirstName" label="First Name">
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                        />
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel controlId="formLastName" label="Last Name">
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                        />
                    </FloatingLabel>
                </Col>
            </Row>
            <FloatingLabel
                controlId="formEmail"
                label="Email Address"
                className="mb-3"
            >
                <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                />
            </FloatingLabel>
            <FloatingLabel
                controlId="formBiography"
                label="Biography"
                className="mb-3"
            >
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="biography"
                    value={formData.biography}
                    onChange={handleChange}
                    placeholder="Biography"
                    style={{ height: '100px' }}
                />
            </FloatingLabel>
            <FloatingLabel
                controlId="formImage"
                label="Profile Image URL"
                className="mb-3"
            >
                <Form.Control
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Profile Image URL"
                />
            </FloatingLabel>
            <Button variant="primary" type="submit">
                Save Changes
            </Button>{' '}
            <Button variant="secondary" onClick={onCancel}>
                Cancel
            </Button>
        </Form>
    )
}

export default ProfileEdit
