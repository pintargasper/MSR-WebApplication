import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as NavigationHandler from "./NavigationHandler";
import { useAuth } from "../auth/AuthContext";
import * as SignOutHandler from "../no-auth/sign-out/SignOut";
import { FaCog, FaSignOutAlt } from "react-icons/fa";

const Navigation = () => {
    const [expanded, setExpanded] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const { userRole, userData, profileImage, signOutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        NavigationHandler.close(expanded, setExpanded);
        setImageUrl(`${process.env.REACT_APP_PROFILE_IMAGES}${profileImage ? profileImage : "basic-image.jpg"}`);
    }, [expanded, userData, profileImage, userRole]);

    const closeNavbar = () => {
        setExpanded(false);
    };

    const signOut = (event) => {
        SignOutHandler.signOut(event, navigate, signOutUser);
    };

    return (
        <Navbar id={"navbar"} bg={"light"} expand={"sm"} className={"navbar navbar-expand-lg navbar-light bg-light fixed-top"} expanded={expanded}>
            <Container fluid>
                {
                    userRole === null && (
                        <Link to={"/"} className={"navbar-brand hide-text navbar-title-change-text"} onClick={closeNavbar}>
                            Memo Stick Rescue
                        </Link>
                    )
                }
                {
                    userRole === "ROLE_ADMIN" && (
                        <>
                            <Link to={"/dashboard"} className={"navbar-brand hide-text navbar-title-change-text"} onClick={closeNavbar}>
                                Dashboard
                            </Link>
                        </>
                    )
                }
                {
                    userRole === "ROLE_USER" && (
                        <>
                            <Link to={`/${userData.username}`} className={"navbar-brand hide-text navbar-title-change-text"} onClick={closeNavbar}>
                                Home
                            </Link>
                        </>
                    )
                }
                <Navbar.Toggle aria-controls={"navbarScroll"} className={"navigation-hamburger"} onClick={() => setExpanded(!expanded)}/>
                <Navbar.Collapse id={"navbarScroll"}>
                    <Nav className={"me-auto my-2 my-lg-0"} navbarScroll>
                        {
                            userRole === null && (
                                <Link to={"/news"} className={"nav-link"} onClick={closeNavbar}>News</Link>
                            )
                        }
                        {
                            userRole === "ROLE_USER" && (
                                <>
                                    <Link to={`/${userData.username}/statistics`} className={"nav-link"} onClick={closeNavbar}>Statistics</Link>
                                </>
                            )
                        }
                    </Nav>
                    <Nav className={"d-flex"}>
                        {
                            userRole === null && (
                                <>
                                    <Link to={"/sign-in"} className={"nav-link"} onClick={closeNavbar}>Sign In</Link>
                                    <Link to={"/sign-up"} className={"nav-link"} onClick={closeNavbar}>Sign Up</Link>
                                </>
                            )
                        }
                        {
                            userRole !== null && (
                                <Dropdown align="end">
                                    <Dropdown.Toggle variant="link" id="dropdown-custom-components">
                                        <img src={imageUrl} alt={"user-icon"} className={"img-fluid rounded-circle"} width={40} height={40} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as="div" className="d-flex align-items-center">
                                            <FaCog size={24} className="mr-2" />
                                            {
                                                userRole === "ROLE_ADMIN" && (
                                                    <Link to={"/settings"} className="dropdown-item" onClick={closeNavbar}>
                                                        Settings
                                                    </Link>
                                                )
                                            }
                                            {
                                                userRole === "ROLE_USER" && (
                                                    <Link to={`/${userData.username}/settings`} className="dropdown-item" onClick={closeNavbar}>
                                                        Settings
                                                    </Link>
                                                )
                                            }
                                        </Dropdown.Item>
                                        <Dropdown.Item as={"div"} className={"d-flex align-items-center"}>
                                            <FaSignOutAlt  size={24} className="mr-2"/>
                                            <button className={"dropdown-item"} onClick={(event) => {
                                                closeNavbar();
                                                signOut(event);
                                            }}>Sign Out
                                            </button>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;