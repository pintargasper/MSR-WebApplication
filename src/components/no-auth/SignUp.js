import {Link} from "react-router-dom";
import {useState} from "react";

const SignUp = () => {

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [country, setCountry] = useState("");

    const handleSignUp = (event) => {

    }

    return (
        <section id={"sign-in"} className={"container form d-flex align-items-center mt-5"}>
            <div className={"container"}>
                <div className={"row justify-content-center"}>
                    <div className={"col-lg-5 text-center"}>
                        <form method={"post"} className={"input-form p-3 p-md-4"} onSubmit={handleSignUp}>
                            <h1>Sign up</h1>
                            <div className={"form-group mt-2"}>
                                <input type={"text"} className={"input form-control mt-1"} name={"fullName"}
                                       placeholder={"Enter full name"}
                                       value={fullName}
                                       onChange={(event) => setFullName(event.target.value)}/>
                            </div>
                            <div className={"form-group mt-2"}>
                                <input type={"text"} className={"input form-control mt-1"} name={"username"}
                                       placeholder={"Enter username"}
                                       value={username}
                                       onChange={(event) => setUsername(event.target.value)}/>
                            </div>
                            <div className={"form-group mt-2"}>
                                <input type={"text"} className={"input form-control mt-1"} name={"emailAddress"}
                                       placeholder={"Enter email address"}
                                       value={emailAddress}
                                       onChange={(event) => setEmailAddress(event.target.value)}/>
                            </div>
                            <div className={"form-group mt-2"}>
                                <input type={"password"} className={"input form-control mt-1"} name={"password"}
                                       placeholder={"Enter password"}
                                       value={password}
                                       onChange={(event) => setPassword(event.target.value)}/>
                            </div>
                            <div className={"form-group mt-2"}>
                                <input type={"password"} className={"input form-control mt-1"} name={"confirmPassword"}
                                       placeholder={"Re-enter password"}
                                       value={confirmPassword}
                                       onChange={(event) => setConfirmPassword(event.target.value)}/>
                            </div>
                            <div className={"form-group mt-2"}>
                                <input type={"date"} className={"input form-control mt-1"} name={"birthdate"}
                                       placeholder={"Enter birthdate"}
                                       value={birthdate}
                                       onChange={(event) => setBirthdate(event.target.value)}/>
                            </div>
                            <div className={"form-group mt-2"}>
                                <input type={"text"} className={"input form-control mt-1"} name={"country"}
                                       placeholder={"Enter country"}
                                       value={country}
                                       onChange={(event) => setCountry(event.target.value)}/>
                            </div>
                            <div className={"form-group text-sm-start mt-2"}>
                                <Link to={"/sign-in"}>Already have an account?</Link>
                            </div>
                            <div className={"text-center mt-2"}>
                                <button type={"submit"} className={"button"}>Sign up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp