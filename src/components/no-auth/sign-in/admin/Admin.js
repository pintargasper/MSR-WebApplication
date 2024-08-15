import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Popup} from "../../../popup/Popup";
import * as AdminHandler from "./AdminHandler";
import {useAuth} from "../../../auth/AuthContext";

const Admin = () => {

    const [usernameEmail, setUsernameEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const { setTokenValue, setUserRoleValue } = useAuth();
    const navigate = useNavigate();

    const handleAdmin = (event) => {
        AdminHandler.signIn(event, usernameEmail, password, setError, setModalOpen, navigate, setTokenValue, setUserRoleValue).then(result => null);
    }

    return (
        <>
            <section id={"sign-in"} className={"container form d-flex align-items-center mt-5"}>
                <div className={"container"}>
                    <div className={"row justify-content-center"}>
                        <div className={"col-lg-5 text-center"}>
                            <form method={"post"} className={"input-form p-3 p-md-4"} onSubmit={handleAdmin}>
                                <h1>Console</h1>
                                <div className={"form-group mt-2"}>
                                    <input type={"text"} className={"input form-control mt-1"} name={"emailAddressUsername"}
                                           placeholder={"Enter email address or username"}
                                           value={usernameEmail}
                                           autoComplete={"username"}
                                           onChange={(event) => setUsernameEmail(event.target.value)}/>
                                </div>
                                <div className={"form-group mt-2"}>
                                    <input type={"password"} className={"input form-control mt-1"} name={"password"}
                                           placeholder={"Enter password"}
                                           value={password}
                                           autoComplete={"current-password"}
                                           onChange={(event) => setPassword(event.target.value)}/>
                                </div>
                                <div className={"text-center mt-2"}>
                                    <button type={"submit"} className={"button"}>Sign In</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Popup trigger={modalOpen} setTrigger={setModalOpen}>
                <div className={"popup form"}>
                    <div className={"text-center"}>
                        <h3>Sign in</h3>
                        <p>{error}</p>
                    </div>
                    <div className={"text-right"}>
                        <div className={"input-form"}>
                            <button type={"submit"} className={"button mt-2 mb-2"} onClick={() => setModalOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    )
}

export default Admin