import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Sidebar from "./menu/SideBar";
import "./Admindashboard.css";
import DepartmentCard from "../components/cards/DepartmentCard";
import UsersCard from "../components/cards/UserCard";
import ResponsibilityBarCard from "../components/cards/ResponsibilityBarCard";

const AdminDashboard = () => {
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
                                <h1 className="text-center">Admin Dashboard</h1>
                            </Col>
                        </Row>
                        <Row style={{ paddingBottom: '15px' }}>
                            <Col md={3} style={{ border: '1px solid black', marginRight: '15px', marginBottom: '2px' }}>
                                <h4 className='text-center'>Employees by Department</h4>
                                <DepartmentCard />
                            </Col>
                            <Col md={3} style={{ border: '1px solid black', marginRight: '15px', margingBottom: '2px' }}>
                                <h4 className='text-center'>Users by Roles</h4>
                                <UsersCard />
                            </Col>
                            <Col md={5} style={{ border: '1px solid black' }}>
                                <h4 className='text-center'>Employees by Responsibility</h4>
                                {/* <Pie data={employeeResponsibilityData} /> */}
                                <ResponsibilityBarCard />
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </div>
    );
};

export default AdminDashboard;
