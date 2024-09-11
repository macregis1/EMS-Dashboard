import { Container, Nav, Navbar } from "react-bootstrap";
import "./Header.css";
import UseLogout from "../main/Logout";
import { Link } from "react-router-dom";

const Header = () => {
    const Logout = UseLogout();
    const user = localStorage.getItem("userName");
    return (
        <>
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/admin"><strong>Employee Management System</strong></Navbar.Brand>
                <Nav className="ml-auto">
                    <Navbar.Brand><strong>{user}</strong></Navbar.Brand>
                    {/* <Nav.Link as={Link} to="/admin" className="nav-link">Employees</Nav.Link> 
                    <Nav.Link as={Link} to="/admin/employee" className="nav-link">Post Employee</Nav.Link>  */}
                    <Nav.Link className="nav-link" onClick={Logout}>Logout</Nav.Link> 
                </Nav>
            </Container>
        </Navbar>
        </>
    );
};

export default Header;