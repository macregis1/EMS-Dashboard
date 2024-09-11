import { Col, Container, Row, Table, Button } from "react-bootstrap";
import DepartmentCard from "../components/cards/DepartmentCard";
import ResponsibilityBarCard from "../components/cards/ResponsibilityBarCard";
import ResponsibilityPieCard from "../components/cards/ResponsibilityPieCard";
import EmployeeTableCard from "../components/cards/EmployeeTableCard";


const Dashboard = () => {

    return (
        <>
            <Container className="mt-5">
                <EmployeeTableCard />
                <Row style={{ paddingBottom: '15px' }}>
                    <Col xs={4} style={{ border: '1px solid black', marginRight: '20px', marginBottom: '2px' }}>
                        <h4 className='text-center'>Employees by Department</h4>
                        <DepartmentCard />
                    </Col>
                    <Col xs={3} style={{ border: '1px solid black', marginRight: '20px', marginBottom: '2px' }}>
                        <ResponsibilityPieCard />
                    </Col>
                    <Col xs={4} style={{ border: '1px solid black' }}>
                        <h4 className='text-center'>Employees by Responsibility</h4>
                        <ResponsibilityBarCard />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Dashboard;
