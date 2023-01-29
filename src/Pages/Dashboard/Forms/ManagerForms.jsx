import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'

const ManagerForms = () => {
    const [manager, setManager] = useState(false);
    const [create, setCreate] = useState(false);
    const [read, setRead] = useState(false);
    const [update, setUpdatete] = useState(false);
    const [remove, setRemove] = useState(false);

    console.log(manager, create, read, update, remove)

    return (
        <div>
            <Form>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicCheckboxManager">
                            <Form.Check type="checkbox" label="Manager" onChange={e => setManager(e.target.checked)} />
                        </Form.Group>
                    </Col>
                    <Col md={8} className="d-flex gap-5">
                        <Form.Group className="mb-3" controlId="formBasicCheckboxPost">
                            <Form.Check type="checkbox" label="Create" onChange={e => setCreate(e.target.checked)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckboxGet">
                            <Form.Check type="checkbox" label="Read" onChange={e => setRead(e.target.checked)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckboxPut">
                            <Form.Check type="checkbox" label="Update" onChange={e => setUpdatete(e.target.checked)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckboxRemove">
                            <Form.Check type="checkbox" label="Delete" onChange={e => setRemove(e.target.checked)} />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default ManagerForms