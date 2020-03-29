import React from "react";
import BackDrop from "../BackDrop/BackDrop";
import Modal from "../Modal/Modal";

export default (props) => {
    return props.show ? (
        <BackDrop clicked={props.backDropClicked}>
            <Modal>
                {props.children}
            </Modal>
        </BackDrop>
    ) : null;
}