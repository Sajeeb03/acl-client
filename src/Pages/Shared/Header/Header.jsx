
import "./Header.css"
import { FaBars, FaHome, FaUserAlt } from "react-icons/fa"

import Container from 'react-bootstrap/Container';

import { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ children }) => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleSignOut = async () => {
        await logOut();
        navigate("/user/login");
    }

    return (
        <>
            <div className="navbar">
                <Container className="d-flex justify-content-between align-items-center">
                    <div className="">
                        <Link to="/" className="text-white text-decoration-none fw-bold">Dashboard</Link>
                    </div>
                    <div className="d-flex align-items-center">
                        <div>
                            {
                                children && <span className="drawerIcon" onClick={() => children[1](!children[0])}><FaBars className="bar-icon me-3" /> </span>
                            }
                        </div>
                        <div>
                            <p className="m-0 d-flex align-items-center gap-2 text-white fw-bold"><FaUserAlt /> <span>{
                                user?.uid ? <span onClick={handleSignOut}>Sign Out</span> : <Link to="/user/login" className="text-white text-decoration-none"><span>SIgn In</span></Link>
                            }</span></p>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default Header