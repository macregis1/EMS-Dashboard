import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";


const Splash = () => {
    return(
        <>
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/"><strong>Employee Management System</strong></Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link> 
                    <Nav.Link as={Link} to="/register" className="nav-link">Register</Nav.Link> 
                </Nav>
            </Container>
        </Navbar>
        </>
    )
};
export default Splash;