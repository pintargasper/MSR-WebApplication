import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import * as NavigationHandler from "./NavigationHandler";

const Navigation = () => {
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        return NavigationHandler.close(expanded, setExpanded);
    }, [expanded]);

    const closeNavbar = () => {
        setExpanded(false);
    };

    return (
        <Navbar id={"navbar"} bg={"light"} expand={"sm"} className={"navbar navbar-expand-lg navbar-light bg-light fixed-top"} expanded={expanded}>
            <Container fluid>
                <Link to={"/"} className={"navbar-brand hide-text navbar-title-change-text"} onClick={closeNavbar}>
                    <span>Memo Stick Rescue</span>
                </Link>
                <Navbar.Toggle aria-controls={"navbarScroll"} className={"navigation-hamburger"} onClick={() => setExpanded(!expanded)}/>
                <Navbar.Collapse id={"navbarScroll"}>
                    <Nav className={"me-auto my-2 my-lg-0"} navbarScroll>
                        <Link to={"/news"} className={"nav-link"} onClick={closeNavbar}>News</Link>
                    </Nav>
                    <Nav className={"d-flex"}>
                        <Link to={"/sign-in"} className={"nav-link"} onClick={closeNavbar}>Sign In</Link>
                        <Link to={"/sign-up"} className={"nav-link"} onClick={closeNavbar}>Sign Up</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;