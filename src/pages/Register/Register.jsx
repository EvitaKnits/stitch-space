import { useContext, useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'

import axiosClient from '../../api/axiosDefaults'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

const Register = () => {
    const { logIn } = useContext(CurrentUserContext)
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false)
    const [errors, setErrors] = useState({})
    const [signUpData, setSignUpData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password1: '',
        password2: '',
    })
    const { firstName, lastName, email, password1, password2 } = signUpData

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        const form = event.currentTarget
        event.preventDefault()
        if (form.checkValidity()) {
            try {
                await axiosClient.post('/dj-rest-auth/registration/', {
                    ...signUpData,
                    username: signUpData.email,
                })
                await logIn({
                    password: signUpData.password1,
                    username: signUpData.email,
                })
                navigate('/')
            } catch (err) {
                setErrors(err.response?.data)
            }
        }
        setValidated(true)
    }

    return (
        <Card className="container-sm col-md-6 mx-auto mt-5">
            <h1 className="m-3">Sign Up</h1>
            <Form
                validated={validated}
                onSubmit={handleSubmit}
                className="d-flex flex-column text-start gap-3"
            >
                {/* First Name Field */}
                <FloatingLabel controlId="first_name" label="First Name">
                    <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                        isInvalid={!!errors.firstName}
                        name="first_name"
                        value={firstName}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.firstName || 'Required Field'}
                    </Form.Control.Feedback>
                </FloatingLabel>

                {/* Last Name Field */}
                <FloatingLabel controlId="last_name" label="Last Name">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Last name"
                        isInvalid={!!errors.lastName}
                        name="last_name"
                        value={lastName}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.lastName || 'Required Field'}
                    </Form.Control.Feedback>
                </FloatingLabel>

                {/* Email Field */}
                <FloatingLabel controlId="email" label="E-mail">
                    <Form.Control
                        required
                        type="email"
                        placeholder="name@example.com"
                        isInvalid={!!errors.username}
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.username && 'A user with this email address already exists. Please log in if you already have an account, or enter a different email address to create a new user.'}
                    </Form.Control.Feedback>
                </FloatingLabel>

                {/* Password Field */}
                <FloatingLabel controlId="password1" label="Password">
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        isInvalid={!!errors.password1}
                        name="password1"
                        value={password1}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password1 || 'Required Field'}
                    </Form.Control.Feedback>
                </FloatingLabel>

                {/* Confirm Password Field */}
                <FloatingLabel controlId="password2" label="Re-type Password">
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        isInvalid={!!errors.password2}
                        name="password2"
                        value={password2}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password2 || 'Required Field'}
                    </Form.Control.Feedback>
                </FloatingLabel>

                {/* Submit Button */}
                <Button type="submit" className="mx-auto">
                    Register
                </Button>

                {/* Sign In Link */}
                <Link to="/login" className="mb-2 mx-auto">
                    Already have an account? Sign in
                </Link>

                {/* Non-field Errors */}
                {errors.non_field_errors?.map((message, idx) => (
                    <Alert key={idx} variant="warning" className="mt-3">
                        {message}
                    </Alert>
                ))}
            </Form>
        </Card>
    )
}

export default Register
