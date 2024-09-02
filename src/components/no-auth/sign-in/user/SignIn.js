import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as SignInHandler from "./SignInHandler";
import {Popup} from "../../../popup/Popup";
import {useAuth} from "../../../auth/AuthContext";

const SignIn = () => {

    const [usernameEmail, setUsernameEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const { setTokenValue, setUserRoleValue, deletedAccount, accountDelete } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (deletedAccount) {
            setIsDeleted(true);
            accountDelete(false);
            setModalOpen(true);
        }
    }, [accountDelete, deletedAccount]);

    const handleSignIn = (event) => {
        event.preventDefault();
        setIsDeleted(false);

        SignInHandler.signIn(usernameEmail, password).then(result => {
            if (result.success) {
                const [data1, data2] = result.data;
                setTokenValue(data1);
                setUserRoleValue("ROLE_USER");
                navigate(`/${data2}`);
            } else {
                setError(result.error);
                setModalOpen(true);
            }
        });
    }

    return (
        <>
            <section id={"sign-in"} className={"container form d-flex align-items-center mt-5"}>
                <div className={"container"}>
                    <div className={"row justify-content-center"}>
                        <div className={"col-lg-5 text-center"}>
                            <form className={"input-form p-3 p-md-4"}>
                                <h1>Sign in</h1>
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
                                <div className={"form-group text-sm-start mt-2"}>
                                    <Link to={"/forgot-password"}>Forgot Password?</Link>
                                </div>
                                <div className={"text-center mt-2"}>
                                    <button type={"submit"} className={"button"} onClick={handleSignIn}>Sign In</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Popup trigger={modalOpen} setTrigger={setModalOpen}>
                <div className={"popup form"}>
                    <div className={"text-center"}>
                        {
                            !isDeleted ?
                                <>
                                    <h3>Sign in</h3>
                                    <p>{error}</p>
                                </> :
                                <>
                                    <h3>Account</h3>
                                    <p>Your account has been deleted</p>
                                </>
                        }
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

export default SignIn