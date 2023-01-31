import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

import "./AclList.css"

const AclList = () => {






    const handleChange = (e) => {
        if (e.target.checked) {
            console.log("checked");
        }
        else {
            console.log("unchecked")
        }
    }

    return (
        <div className='access'>
            <h5>Access Control List</h5>
            <Row>
                <Col>
                    <h6>Users Role</h6>
                    <Form.Group className="mb-3" controlId="formBasicCheckboxAdmin">
                        <Form.Check type="checkbox" label="Admin" value="admin" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckboxManager">
                        <Form.Check type="checkbox" label="Manager" onChange={e => setManager(e.target.checked)} />
                    </Form.Group>
                </Col>
                <Col sm={8}>
                    <h6>Permissions</h6>
                    {/* //admin operations */}
                    <div className='d-flex gap-5'>
                        <Form.Group className="mb-3" controlId="formBasicCheckboxCreate">
                            <Form.Check type="checkbox" label="Create" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckboxRead">
                            <Form.Check type="checkbox" label="Read" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckboxUpdate">
                            <Form.Check type="checkbox" label="Update" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckboxDelete">
                            <Form.Check type="checkbox" label="Delete" />
                        </Form.Group>
                    </div>

                    {/* manager operattios */}

                    <div className='d-flex gap-5'>
                        <Form.Group className="mb-3" controlId="formBasicCheckboxPost">
                            <Form.Check type="checkbox" label="Create" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckboxGet">
                            <Form.Check type="checkbox" label="Read" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckboxPut">
                            <Form.Check type="checkbox" label="Update" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckboxRemove">
                            <Form.Check type="checkbox" label="Delete" />
                        </Form.Group>
                    </div>



                </Col>
            </Row>
        </div>
    )
}

export default AclList