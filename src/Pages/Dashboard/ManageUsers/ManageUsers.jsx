import React from 'react'
import { Table } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import { useAddUserMutation, useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from "../../../app/users/userSlice"
import Loader from '../../../components/Loader/Loader'
import "./ManageUsers.css"

const ManageUsers = () => {

    const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery();

    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const handleAdminUpdate = async user => {
        updateUser({ id: user._id, role: "admin" })
    }

    const handleManagerUpdate = async user => {
        updateUser({ id: user._id, role: "manager" })
    }

    let content;

    if (isLoading) {
        return <Loader />
    }

    else if (isSuccess) {
        content = users.map((user, i) => <tr key={user._id}>
            <td>{i + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                <div className='d-flex align-items-center justify-content-around gap-1'>
                    <button onClick={() => handleAdminUpdate(user)} disabled={user.role === "admin"} className="adminBtn">Make Admin</button>
                    <button onClick={() => handleManagerUpdate(user)} disabled={user.role === "manager"} className="managerBtn">Make Manager</button>
                    <FaTrash onClick={() => deleteUser(user)} className='icon text-danger' title="Delete user" />
                </div>
            </td>
        </tr>)
    }

    else if (isError) {
        content = <p>{error}</p>;
    }

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