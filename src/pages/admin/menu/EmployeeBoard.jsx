import { Button, Container, Col, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import "./board.css";
import EmployeeTableCard from "../../components/cards/EmployeeTableCard";

const EmployeeBoard = () => {
    const navigate = useNavigate();

    return (
        <div className="admin-dashboard">
            <Row>
                <Col xs={2}>
                    <Sidebar />
                </Col>
                <Col xs={10}>
                    <Container className="mt-5">
                        {/* <Row>
                            <Col>
                                <h1 className="text-center">Employees</h1>
                            </Col>
                            <Col >
                                <Button className="create-button" onClick={() => navigate('/admin/employees/employee')} >Post employee</Button>{" "}
                                <Button className="sort-button" variant="outline-primary" >Sort</Button>
                            </Col>
                        </Row> */}
                        <EmployeeTableCard />
                    </Container>
                </Col>
            </Row>
        </div>
    );
};

export default EmployeeBoard;
