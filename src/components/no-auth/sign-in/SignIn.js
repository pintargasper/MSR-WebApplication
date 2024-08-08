import {Link} from "react-router-dom";
import {useState} from "react";
import * as SignInHandler from "./SignInHandler";

const SignIn = () => {

    const [emailUsernameEmail, setEmailUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = (event) => {
        SignInHandler.signIn(event, emailUsernameEmail, password, null, null, null, null);
    }

    return (
        <section id={"sign-in"} className={"container form d-flex align-items-center mt-5"}>
            <div className={"container"}>
                <div className={"row justify-content-center"}>
                    <div className={"col-lg-5 text-center"}>
                        <form method={"post"} className={"input-form p-3 p-md-4"} onSubmit={handleSignIn}>
                            <h1>Sign in</h1>
                            <div className={"form-group mt-2"}>
                                <input type={"text"} className={"input form-control mt-1"} name={"emailAddressUsername"}
                                       placeholder={"Enter email address or username"}
                                       value={emailUsernameEmail}
                                       onChange={(event) => setEmailUsername(event.target.value)}/>
                            </div>
                            <div className={"form-group mt-2"}>
                                <input type={"password"} className={"input form-control mt-1"} name={"password"}
                                       placeholder={"Enter password"}
                                       value={password}
                                       onChange={(event) => setPassword(event.target.value)}/>
                            </div>
                            <div className={"form-group text-sm-start mt-2"}>
                                <Link to={"/forgot-password"}>Forgot Password?</Link>
                            </div>
                            <div className={"text-center mt-2"}>
                                <button type={"submit"} className={"button"}>Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignIn