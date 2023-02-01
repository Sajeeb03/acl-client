import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import Cookies from 'universal-cookie';
import { baseURL } from '../../../assets/baseUrl';
import { AuthContext } from '../../../Contexts/AuthProvider';

import "./AclList.css"

const AclList = () => {

    const [acl, setAcl] = useState();
    const [refetch, setRefetch] = useState(false);
    const { user } = useContext(AuthContext);

    const cookies = new Cookies();

    useEffect(() => {
        axios(`${baseURL}/permission`, {
            headers: {
                "contente-type": "application/json",
                Authorization: `Bearer ${cookies.get("accessToken")}`
            }
        })
            .then(res => {
                setAcl(res.data.data);
                updateToken(user?.email)
                setRefetch(false);
            })
            .catch(err => console.log(err))

    }, [refetch, user])




    const handleAllow = async (e) => {
        const user = e.target.value;
        try {
            const res = await axios.put(`${baseURL}/permission/${user}`)
            const data = res.data;
            setRefetch(true);
        } catch (error) {
            console.log(error)
        }
    }



    const handlePermission = async (e) => {
        const access = { access: e.target.value };

        // console.log(access)
        try {
            const res = await axios.put(`${baseURL}/permission`, access)
            const data = res.data;
            setRefetch(true);
        } catch (error) {
            console.log(error)
        }
    }



    //update the token for access controlling 

    const updateToken = (email) => {
        axios(`${baseURL}/jwt?email=${email}`)
            .then(res => {
                const token = res.data.data;
                cookies.set('accessToken', token, { path: "/" })
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className='access'>
            <h5>Access Control List</h5>
            <Row>
                <Col>
                    <h6>Users Role</h6>
                    <Form.Group className="mb-3" controlId="formBasicCheckboxAdmin">
                        <Form.Check
                            checked={acl?.allowed.includes('admin')}
                            type="checkbox"
                            label="Admin"
                            value="admin"
                            onClick={handleAllow}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckboxManager">
                        <Form.Check
                            checked={acl?.allowed.includes('manager')}
                            type="checkbox"
                            label="Manager"
                            value="manager"
                            onChange={handleAllow}
                        />
                    </Form.Group>
                </Col>


                <Col sm={8}>
                    <h6>Permissions</h6>
                    {/* admin operations */}
                    <div className='d-flex gap-5'>
                        <Form.Group className="mb-3" controlId="formBasicCheckboxCreate">
                            <Form.Check
                                checked={acl?.scope.includes('admin:write')}
                                type="checkbox"
                                label="Create"
                                value="admin:write"
                                onClick={handlePermission}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckboxRead">
                            <Form.Check
                                checked={acl?.scope.includes('admin:read')}
                                type="checkbox"
                                label="Read"
                                value="admin:read"
                                onClick={handlePermission}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckboxUpdate">
                            <Form.Check
                                checked={acl?.scope.includes('admin:update')}
                                type="checkbox"
                                label="Update"
                                value="admin:update"
                                onClick={handlePermission}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckboxDelete">
                            <Form.Check
                                checked={acl?.scope.includes('admin:delete')}
                                type="checkbox"
                                label="Delete"
                                value="admin:delete"
                                onClick={handlePermission}
                            />
                        </Form.Group>
                    </div>

                    {/* manager operattios */}

                    <div className='d-flex gap-5'>
                        <Form.Group className="mb-3" controlId="formBasicCheckboxPost">
                            <Form.Check
                                checked={acl?.scope.includes('manager:write')}
                                type="checkbox"
                                label="Create"
                                value="manager:write"
                                onClick={handlePermission}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckboxGet">
                            <Form.Check
                                checked={acl?.scope.includes('manager:read')}
                                type="checkbox"
                                label="Read"
                                value="manager:read"
                                onClick={handlePermission}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckboxPut">
                            <Form.Check
                                checked={acl?.scope.includes('manager:update')}
                                type="checkbox"
                                label="Update"
                                value="manager:update"
                                onClick={handlePermission}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckboxRemove">
                            <Form.Check
                                checked={acl?.scope.includes('manager:delete')}
                                type="checkbox"
                                label="Delete"
                                value="manager:delete"
                                onClick={handlePermission}
                            />
                        </Form.Group>
                    </div>

                </Col>
            </Row>
        </div>
    )
}

export default AclList