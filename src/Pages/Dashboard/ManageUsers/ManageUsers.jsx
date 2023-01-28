import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'

import "./ManageUsers.css"
import axios from 'axios'
import { baseURL } from '../../../assets/baseUrl'


const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [refetch, setRefech] = useState(false);

    useEffect(() => {
        axios(`${baseURL}/users`)
            .then(res => {
                setUsers(res.data.data);
                setRefech(false);
            })
            .catch(err => {
                console.log(err)
            })
    }, [refetch])

//updating the role of the user
    const handleAdminUpdate = async user => {
        const updateData = { role: "admin" }
        try {
            const res = await axios.put(`${baseURL}/users/${user._id}`, updateData)
            setRefech(true);
        } catch (error) {
            console.log(error)
        }
    }

    const handleManagerUpdate = async user => {
        const updateData = { role: "manager" }
        try {
            const res = await axios.put(`${baseURL}/users/${user._id}`, updateData)
            setRefech(true);
        } catch (error) {
            console.log(error)
        }
    }

    //deleting the user
    const handleDelete = async user => {
        try {
            const res = await axios.delete(`${baseURL}/user/${user._id}`)
            setRefech(true);
        } catch (error) {
            console.log(error);
        }
    }





    let content = users?.map((user, i) =>
        <tr key={user._id}>
            <td>{i + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                <div className='d-flex align-items-center justify-content-around gap-1'>
                    <button onClick={() => handleAdminUpdate(user)} disabled={user.role === "admin"} className="adminBtn">Make Admin</button>
                    <button onClick={() => handleManagerUpdate(user)} disabled={user.role === "manager"} className="managerBtn">Make Manager</button>
                    <FaTrash onClick={() => handleDelete(user)} className='icon text-danger' title="Delete user" />
                </div>
            </td>
        </tr>)




    return (
        <div className='manage'>
            <h5>Manage Users</h5>

            <Table bordered>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </Table>
        </div>
    )
}

export default ManageUsers