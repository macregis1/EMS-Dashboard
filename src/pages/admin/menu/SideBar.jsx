import { Link, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Nav className="flex-column">
                <NavLink as={Link} to="/admin/employees" className="side-nav" activeClassName="active">
                    Employee
                </NavLink>
                <NavLink as={Link} to="/admin/users" className="side-nav" activeClassName="active">
                    Users
                </NavLink>
                <NavLink as={Link} to="/admin/profile" className="side-nav" activeClassName="active">
                    Profile
                </NavLink>
            </Nav>
        </div>
    );
};

export default Sidebar;
