import React, { useEffect, useState, useRef } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from 'react-router-dom';
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import "jspdf-autotable";

const EmployeeTableCard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isUser = location.pathname.includes('/admin');
    const [employees, setEmployees] = useState([]);

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
            const response = await fetch(`/api/employee/${employeeId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== employeeId));
            }
            console.log(`employee with id ${employeeId} deleted`);
        } catch (error) {
            console.log("error deleting employee", error.message);
        }
    };

    const handleUpdate = (employeeId) => {
        navigate(`/admin/employees/employee/${employeeId}`);
    };
    const componentRef = useRef();
    // Print Function
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    // Generate PDF Function
    const handleGeneratePDF = () => {
        const doc = new jsPDF();
        // Define the columns and rows for the table
        const columns = ["Name", "Email", "Phone", "Department", "Responsibility"];
        const rows = employees.map(employee => [
            employee.name,
            employee.email,
            employee.phone,
            employee.department,
            employee.responsibility,
        ]);
        // AutoTable plugin call to create the table
        doc.autoTable({
            head: [columns], // The columns to use as headers
            body: rows,      // The data rows
            startY: 20,      // Starting Y position on the page
            margin: { left: 10 },  // Margin from the left
            theme: 'grid',  // Theme (optional)
            styles: {
                fontSize: 10,
                cellPadding: 3,
            },
        });

        // Save the PDF
        doc.save("employees.pdf");
    };
    return (
        <>
            {isUser ? (
                <Row>
                    <Col>
                        <h1 className="text-center">Employees</h1>
                    </Col>
                    <Col >
                        <Button className="create-button" onClick={() => navigate('/admin/employees/employee')} >Post employee</Button>{" "}
                        <Button className="sort-button" variant="outline-primary" >Sort</Button>
                    </Col>
                </Row>
            ) : (
                <Row>
                    <Col xs={8}><h1 className="text-center">Employees</h1></Col>
                    <Col xs={2}><Button onClick={handlePrint}>Print Preview</Button></Col>
                    <Col xs={2}><Button onClick={handleGeneratePDF}>Save as PDF</Button></Col>
                </Row>
            )}
            {!isUser && (<Row style={{ paddingBottom: '15px' }}><strong className="text-center">Employee Table</strong></Row>)}
            <Row>
                <Col xs={12}>
                    <div ref={componentRef}>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Department</th>
                                    <th>Responsibility</th>
                                    {isUser && (
                                        <th>Action</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.phone}</td>
                                        <td>{employee.department}</td>
                                        <td>{employee.responsibility}</td>
                                        {isUser && (
                                            <td>
                                                <Button variant="outline-secondary" onClick={() => handleUpdate(employee.id)}>Update</Button>{" "}
                                                <Button variant="outline-danger" onClick={() => handleDelete(employee.id)}>Delete</Button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </>
    );
};
export default EmployeeTableCard;