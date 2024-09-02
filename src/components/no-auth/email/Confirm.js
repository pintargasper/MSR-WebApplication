import {useParams} from "react-router-dom";
import {Popup} from "../../popup/Popup";
import * as EmailHandler from "./EmailHandler";
import {useState} from "react";

const Confirm = () => {

    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const { token } = useParams();

    const handleConfirm = () => {
        EmailHandler.confirmAccount(token).then(result => {
            setError(result.success ? "Your email is confirmed" : result.error);
            setModalOpen(true);
        });
    }

    return(
        <>
            <section id={"confirm"} className={"container form d-flex align-items-center mt-5"}>
                <div className={"container"}>
                    <div className={"row justify-content-center"}>
                        <div className={"col-lg-5 text-center"}>
                            <div className={"input-form p-3 p-md-4"}>
                                <h1>Confirm account</h1>
                                <div className={"text-center mt-2"}>
                                    <button type={"submit"} className={"button"} onClick={handleConfirm}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Popup trigger={modalOpen} setTrigger={setModalOpen}>
                <div className={"popup form"}>
                    <div className={"text-center"}>
                        <h3>Confirm</h3>
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

export default Confirm;