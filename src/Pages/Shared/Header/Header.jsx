
import "./Header.css"
import { FaUserAlt } from "react-icons/fa"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

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
            <Navbar bg="primary" variant="dark" className="navbar">
                <Container>
                    <Nav className="me-auto">
                        <Link to="/" className="text-white text-decoration-none fw-bold">Dashboard</Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        {
                            children && <button className="d-md-none" onClick={() => children[1](!children[0])}> Drawer</button>
                        }
                        <Nav.Item>
                            <p className="m-0 d-flex align-items-center gap-2 text-white fw-bold"><FaUserAlt /> <span>{
                                user?.uid ? <span onClick={handleSignOut}>Sign Out</span> : <Link to="/user/login" className="text-white text-decoration-none"><span>SIgn In</span></Link>
                            }</span></p>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Header