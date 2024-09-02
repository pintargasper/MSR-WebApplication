import {useState} from "react";
import * as FormHandler from "./FormHandler";
import {Popup} from "../../popup/Popup";

const ForgotPassword = () => {

    const [emailAddress, setEmailAddress] = useState("");
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const handleForgotPassword = (event) => {
        event.preventDefault();

        FormHandler.forgotPassword(emailAddress).then(result => {
            setError(result.success ? "Reset email has been sent to you" : result.error);
            setModalOpen(true);
        });
    }

    return (
        <>
            <section id={"forgot-password"} className={"container form d-flex align-items-center mt-5"}>
                <div className={"container"}>
                    <div className={"row justify-content-center"}>
                        <div className={"col-lg-5 text-center"}>
                            <form className={"input-form p-3 p-md-4"}>
                                <h1>Reset password</h1>
                                <div className={"form-group mt-2"}>
                                    <input type={"text"} className={"input form-control mt-1"} name={"emailAddress"}
                                           placeholder={"Enter email address"}
                                           value={emailAddress}
                                           onChange={(event) => setEmailAddress(event.target.value)}/>
                                </div>
                                <div className={"text-center mt-2"}>
                                    <button type={"submit"} className={"button"} onClick={handleForgotPassword}>Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Popup trigger={modalOpen} setTrigger={setModalOpen}>
                <div className={"popup form"}>
                    <div className={"text-center"}>
                        <h3>Reset password</h3>
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

export default ForgotPassword