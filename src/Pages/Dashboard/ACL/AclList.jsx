import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import AdminForms from '../Forms/AdminForms'
import ManagerForms from '../Forms/ManagerForms'
import "./AclList.css"

const AclList = () => {
    return (
        <div className='access'>
            <h5>Access Control List</h5>

            <div>
                <Row>
                    <Col><p className='fw-bold'>User's Role</p></Col>
                    <Col md={8}><p className='fw-bold'>Permissions</p></Col>
                </Row>
                <AdminForms />
                <ManagerForms />
            </div>
        </div>
    )
}

export default AclList