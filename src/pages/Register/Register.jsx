import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Card, Button, Alert } from 'react-bootstrap';
import axiosClient from '../../api/axiosDefaults';
import { Link } from 'react-router-dom';

const Register = () => {
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});
    const [signUpData, setSignUpData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password1: "",
        password2: "",
    });
    const { firstName, lastName, email, password1, password2 } = signUpData;

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity()) {
            try {
                await axiosClient.post("/dj-rest-auth/registration/", signUpData);
            } catch (err) {
                setErrors(err.response?.data);
            }
        }
        setValidated(true);
    };

    return (
        <Card className='container-sm col-md-6 mx-auto mt-5'>
            <h1 className="m-3">Sign Up</h1>
            <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                className="d-flex flex-column text-start gap-3"
            >
                {/* First Name Field */}
                <FloatingLabel controlId="firstName" label="First Name">
                    <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                        isInvalid={!!errors.firstName}
                        name="firstName"
                        value={firstName}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.firstName || 'Required Field'}
                    </Form.Control.Feedback>
                </FloatingLabel>

                {/* Last Name Field */}
                <FloatingLabel controlId="lastName" label="Last Name">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Last name"
                        isInvalid={!!errors.lastName}
                        name="lastName"
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
                        isInvalid={!!errors.email}
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email || 'Must be a valid e-mail'}
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
        </Card>)
};

export default Register;