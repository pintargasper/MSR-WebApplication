import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {Popup} from "../../popup/Popup";
import * as FormHandler from "./FormHandler";

const ResetPassword = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const { token } = useParams();

    useEffect(() => {

    }, [token]);

    const handleNewPassword = (event) => {
        event.preventDefault();

        FormHandler.resetPassword(token, password, confirmPassword).then(result => {
            setError(result.success ? "Password reset successfully" : result.error);
            setModalOpen(true);
        });
    }

    return (
        <>
            <section id={"new-password"} className={"container form d-flex align-items-center mt-5"}>
                <div className={"container"}>
                    <div className={"row justify-content-center"}>
                        <div className={"col-lg-5 text-center"}>
                            <form className={"input-form p-3 p-md-4"}>
                                <h1>Set new password</h1>
                                <div className={"form-group mt-2"}>
                                    <input type={"password"} className={"input form-control mt-1"} name={"password"}
                                           placeholder={"Enter password"}
                                           value={password}
                                           onChange={(event) => setPassword(event.target.value)} />
                                </div>
                                <div className={"form-group mt-2"}>
                                    <input type={"password"} className={"input form-control mt-1"} name={"confirmPassword"}
                                           placeholder={"Re-enter password"}
                                           value={confirmPassword}
                                           onChange={(event) => setConfirmPassword(event.target.value)} />
                                </div>
                                <div className={"text-center mt-2"}>
                                    <button type={"submit"} className={"button"} onClick={handleNewPassword}>Confirm</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Popup trigger={modalOpen} setTrigger={setModalOpen}>
                <div className={"popup form"}>
                    <div className={"text-center"}>
                        <h3>New password</h3>
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
    );
}

export default ResetPassword;