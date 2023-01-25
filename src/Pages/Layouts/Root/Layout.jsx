import React, { useContext, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { useGetAdminQuery } from '../../../app/verifyUser/verifyAdmin'
import Loader from '../../../components/Loader/Loader'
import { AuthContext } from '../../../Contexts/AuthProvider'
import Header from '../../Shared/Header/Header'
import "./Layout.css"

const Layout = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const { loading, user } = useContext(AuthContext);
    const { data: admin, isLoading } = useGetAdminQuery(user?.email)

    if (loading || isLoading) {
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
                                admin && <Link to="/manage"><p>Manage User</p></Link>
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