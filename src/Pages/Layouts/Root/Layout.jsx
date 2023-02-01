import React, { useContext, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaHome } from 'react-icons/fa'
import { Link, Outlet } from 'react-router-dom'

import Loader from '../../../components/Loader/Loader'
import { AuthContext } from '../../../Contexts/AuthProvider'
import useAdmin from '../../../Hooks/useAdmin'
import Header from '../../Shared/Header/Header'
import "./Layout.css"

const Layout = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const { loading, user } = useContext(AuthContext);

    const [isAdmin, adminLoading] = useAdmin(user?.email);

    if (loading || adminLoading) {
        return <Loader />
    }

    return (
        <div className='layout'>
            <Header>{[showDrawer, setShowDrawer]}</Header>
            <Container>
                <Row>
                    <Col sm="auto">
                        <div className={`${showDrawer ? 'show' : "hide"} drawer`}>
                            <Link onClick={() => setShowDrawer(!showDrawer)} to="/"><FaHome /><p>Home</p></Link>
                            <Link onClick={() => setShowDrawer(!showDrawer)} to="/user/login"><p>Sign In</p></Link>
                            <Link onClick={() => setShowDrawer(!showDrawer)} to="/user/register"><p>Sign Up</p></Link>
                            {
                                user?.uid && <Link onClick={() => setShowDrawer(!showDrawer)} to="/manage"><p>Manage User</p></Link>
                            }
                            {
                                isAdmin && <Link onClick={() => setShowDrawer(!showDrawer)} to="/acl">Access</Link>
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