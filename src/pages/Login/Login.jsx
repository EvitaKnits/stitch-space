import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Login = () => {
    const { logIn } = useContext(CurrentUserContext)
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const { email, password } = loginData;

    const handleChange = (event) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity()) {
            try {
                await logIn(loginData);
                navigate('/');
            } catch (err) {
                setErrors(err.response?.data);
            }
        }
        setValidated(true);
    };

    return (
        <Card className='container-sm col-md-6 mx-auto mt-5'>
            <h1 className="m-3">Login</h1>
            <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                className="d-flex flex-column text-start gap-3"
            >
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
                <FloatingLabel controlId="password" label="Password">
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        isInvalid={!!errors.password}
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password1 || 'Required Field'}
                    </Form.Control.Feedback>
                </FloatingLabel>

                {/* Submit Button */}
                <Button type="submit" className="mx-auto">
                    Login
                </Button>

                {/* Sign In Link */}
                <Link to="/register" className="mb-2 mx-auto">
                    Don&apos;t have an account? Sign up
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

export default Login;