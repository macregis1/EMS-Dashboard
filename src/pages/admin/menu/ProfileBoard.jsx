import { useEffect, useState } from "react";
import { Button, Container, Col, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import "./board.css";

const ProfileBoard = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("/api/admin/employees");
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.log("error fetching employees", error.message);
            }
        };
        fetchEmployees();
    }, []);

    const handleDelete = async (employeeId) => {
        try {
            const response = await fetch(`/api/admin/employee/${employeeId}`, {
                method: 'DELETE'
            });
            if(response.ok){
                setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== employeeId));
            }
            console.log(`employee with id ${employeeId} deleted`);
        } catch (error) {
            console.log("error deleting employee", error.message);
        }
    };

    const handleUpdate = (employeeId) => {
        navigate(`/admin/employee/${employeeId}`);
    };

    return (
        <div className="admin-dashboard">
            <Row>
                <Col xs={2}>
                    <Sidebar />
                </Col>
                <Col xs={10}>
                    <Container className="mt-5">
                        <Row>
                            <Col>
                                <h1 className="text-center">Employees</h1>
                            </Col>
                            <Col >
                                <Button >Employee</Button> {" "}
                                <Button >Post employee</Button>
                            </Col>
                        </Row>
                        <Row>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Department</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employees.map((employee) => (
                                            <tr key={employee.id}>
                                                <td>{employee.name}</td>
                                                <td>{employee.email}</td>
                                                <td>{employee.phone}</td>
                                                <td>{employee.department}</td>
                                                <td>
                                                    <Button variant="outline-secondary" onClick={() => handleUpdate(employee.id)}>Update</Button>{" "}
                                                    <Button variant="outline-danger" onClick={() => handleDelete(employee.id)}>Delete</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </div>
    );
};

export default ProfileBoard;
