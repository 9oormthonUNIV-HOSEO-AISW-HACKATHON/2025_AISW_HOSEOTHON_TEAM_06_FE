import { useAuth } from "../../context/AuthContext.jsx";
import SignIn from "../sign/SignIn.jsx";
import { Navigate } from 'react-router-dom';
import axios from "axios";

const Home = () => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/signIn" replace />;
    }

    return(
        <>
            HOME
        </>
    )
}

export default Home