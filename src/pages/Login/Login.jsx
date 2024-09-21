import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { logIn } = useContext(CurrentUserContext)
    const navigate = useNavigate();

    const handleLogin = () => {
        logIn();
        navigate('/');
    }

    return (
        <div>
            <Button onClick={handleLogin}>Login</Button>
        </div>
    )
};

export default Login;