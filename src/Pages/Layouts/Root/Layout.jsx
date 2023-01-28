import React, { useContext, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'

import Loader from '../../../components/Loader/Loader'
import { AuthContext } from '../../../Contexts/AuthProvider'
import Header from '../../Shared/Header/Header'
import "./Layout.css"

const Layout = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const { loading, user } = useContext(AuthContext);


    if (loading) {
        return <Loader />
    }

    return (
        <div className='layout'>
            <Header>{[showDrawer, setShowDrawer]}</Header>
            <Container>
                <Row>
                    <Col md="auto">
                        <div className={`${showDrawer ? 'show' : "hide"} drawer`}>
                            <Link to="/"><p>Home</p></Link>
                            <Link to="/user/login"><p>Sign In</p></Link>
                            <Link to="/user/register"><p>Sign Up</p></Link>
                            {
                                user?.uid && <Link to="/manage"><p>Manage User</p></Link>
                            }
                        </div>
                    </Col>
                    <Col>
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Layout