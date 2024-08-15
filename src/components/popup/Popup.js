import {Modal} from "react-bootstrap";

export const Popup = (props) => {
    return props.trigger ? (
        <Modal show={props.trigger} onHide={() => props.setTrigger(false)} animation={true}>
            <Modal.Body>
                {props.children}
            </Modal.Body>
        </Modal>
    ) : null;
}