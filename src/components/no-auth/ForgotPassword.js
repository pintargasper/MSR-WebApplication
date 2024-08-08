import {useState} from "react";

const ForgotPassword = () => {
    const [emailAddress, setEmailAddress] = useState("");

    const handleForgotPassword = (event) => {

    }

    return (
        <section id={"forgot-password"} className={"container form d-flex align-items-center mt-5"}>
            <div className={"container"}>
                <div className={"row justify-content-center"}>
                    <div className={"col-lg-5 text-center"}>
                        <form method={"post"} className={"input-form p-3 p-md-4"} onSubmit={handleForgotPassword}>
                            <h1>Reset password</h1>
                            <div className={"form-group mt-2"}>
                                <input type={"text"} className={"input form-control mt-1"} name={"emailAddress"}
                                       placeholder={"Enter email address"}
                                       value={emailAddress}
                                       onChange={(event) => setEmailAddress(event.target.value)}/>
                            </div>
                            <div className={"text-center mt-2"}>
                                <button type={"submit"} className={"button"}>Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ForgotPassword