
import "./Header.css"
import { FaUserAlt } from "react-icons/fa"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleSignOut = async () => {
        await logOut();
        navigate("/user/login");
    }

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end">
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