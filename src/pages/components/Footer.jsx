import { Container, Navbar} from "react-bootstrap";
import "./Header.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand >
                <strong className="text-center">© {currentYear} Employee Management System </strong>
                </Navbar.Brand>
            </Container>
            </Navbar>
        </>
    );
};

export default Footer;