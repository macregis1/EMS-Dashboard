import { useEffect, useState } from "react";
import { Button, Container, Col, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import "./board.css";

const UserBoard = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/admin/users");
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.log("error fetching users", error.message);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`/api/admin/user/${userId}`, {
                method: 'DELETE'
            });
            if(response.ok){
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
            }
            console.log(`user with id ${userId} deleted`);
        } catch (error) {
            console.log("error deleting user", error.message);
        }
    };

    const handleUpdate = (userId) => {
        navigate(`/admin/users/user/${userId}`);
    };

    return (
            <Row>
                <Col xs={2}>
                    <Sidebar />
                </Col>
                <Col xs={10}>
                    <Container className="mt-5">
                        <Row>
                            <Col>
                                <h1 className="text-center">Users</h1>
                            </Col>
                            <Col >
                                <Button >User</Button> {" "}
                                <Button onClick={() => navigate('/admin/users/user')}>Post user</Button>
                            </Col>
                        </Row>
                        <Row>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.email}</td>
                                                <td>{user.role}</td>
                                                <td>
                                                    <Button variant="outline-secondary" onClick={() => handleUpdate(user.id)}>Update</Button>{" "}
                                                    <Button variant="outline-danger" onClick={() => handleDelete(user.id)}>Delete</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                        </Row>
                    </Container>
                </Col>
            </Row>
    );
};

export default UserBoard;
