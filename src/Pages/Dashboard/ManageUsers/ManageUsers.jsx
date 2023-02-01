import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'

import axios from 'axios'
import { baseURL } from '../../../assets/baseUrl'
import Cookies from 'universal-cookie'
import "./ManageUsers.css"



const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [refetch, setRefech] = useState(false);
    const cookies = new Cookies();

    const [error, setError] = useState("");

    useEffect(() => {
        axios(`${baseURL}/users`, {
            headers: {
                "contente-type": "application/json",
                Authorization: `Bearer ${cookies.get("accessToken")}`
            }
        })
            .then(res => {
                setUsers(res.data.data);
                setRefech(false);
                setError("");
            })
            .catch(err => {
                setError("You do not have access to this page")
                if (err?.response?.status) {
                    // logOut();
                    // navigate("/user/login");
                }
            })
    }, [refetch])

//updating the role of the user
    const handleAdminUpdate = async user => {
        const updateData = { role: "admin" }
        try {
            const res = await axios.put(`${baseURL}/users/${user._id}`, updateData, {
                headers: {
                    "contente-type": "application/json",
                    Authorization: `Bearer ${cookies.get("accessToken")}`
                }
            })
            setRefech(true);
        } catch (error) {
            if (error) {
                alert("You are not allowed to update")
            }
        }
    }

    const handleManagerUpdate = async user => {
        const updateData = { role: "manager" }
        try {
            const res = await axios.put(`${baseURL}/users/${user._id}`, updateData, {
                headers: {
                    "contente-type": "application/json",
                    Authorization: `Bearer ${cookies.get("accessToken")}`
                }
            })

            setRefech(true);
        } catch (error) {
            if (error) {
                alert("You are not allowed to update")
            }
        }
    }

    //deleting the user
    const handleDelete = async user => {
        try {
            const res = await axios.delete(`${baseURL}/users/user/${user._id}`, {
                headers: {
                    "contente-type": "application/json",
                    Authorization: `Bearer ${cookies.get("accessToken")}`
                }
            })
            setRefech(true);
        } catch (error) {
            if (error) {
                alert("You are not allowed to delete")
            }
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

            {
                !error &&
                <div className='table'>
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
            }

            {
                error && <h5 className='text-danger text-center'>{error}</h5>
            }
        </div>
    )
}

export default ManageUsers