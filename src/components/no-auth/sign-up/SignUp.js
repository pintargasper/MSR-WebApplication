import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import * as SignUpHandler from "./SignUpHandler";
import * as Countries from "../Countries";
import {Popup} from "../../popup/Popup";

const SignUp = () => {

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [countriesList, setCountriesList] = useState([]);
    const [country, setCountry] = useState("");
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        Countries.countries(setCountriesList);
    }, []);

    const handleSignUp = (event) => {
        SignUpHandler.signUp(event, fullName, username, emailAddress, password, confirmPassword, birthdate, country, setError, setModalOpen).then(result => null);
    }

    return (
        <>
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
                                           autoComplete={"username"}
                                           onChange={(event) => setUsername(event.target.value)}/>
                                </div>
                                <div className={"form-group mt-2"}>
                                    <input type={"text"} className={"input form-control mt-1"} name={"emailAddress"}
                                           placeholder={"Enter email address"}
                                           value={emailAddress}
                                           autoComplete={"username"}
                                           onChange={(event) => setEmailAddress(event.target.value)}/>
                                </div>
                                <div className={"form-group mt-2"}>
                                    <input type={"password"} className={"input form-control mt-1"} name={"password"}
                                           placeholder={"Enter password"}
                                           value={password}
                                           autoComplete={"new-password"}
                                           onChange={(event) => setPassword(event.target.value)}/>
                                </div>
                                <div className={"form-group mt-2"}>
                                    <input type={"password"} className={"input form-control mt-1"} name={"confirmPassword"}
                                           placeholder={"Re-enter password"}
                                           value={confirmPassword}
                                           autoComplete={"new-password"}
                                           onChange={(event) => setConfirmPassword(event.target.value)}/>
                                </div>
                                <div className={"form-group mt-2"}>
                                    <input type={"date"} className={"input form-control mt-1"} name={"birthdate"}
                                           placeholder={"Enter birthdate"}
                                           value={birthdate}
                                           onChange={(event) => setBirthdate(event.target.value)}/>
                                </div>
                                <div className={"form-group mt-2"}>
                                    <select className={"input form-control mt-1"} name={"country"}
                                            value={country}
                                            onChange={(event) => setCountry(event.target.value)}>
                                        <option value={""} disabled>Select country</option>
                                        {countriesList.map((countryItem, index) => (
                                            <option key={index} value={countryItem.name}>{countryItem.name}</option>
                                        ))}
                                    </select>
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
            <Popup trigger={modalOpen} setTrigger={setModalOpen}>
                <div className={"popup form"}>
                    <div className={"text-center"}>
                        <h3>Sign up</h3>
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

export default SignUp;