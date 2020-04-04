import React, {Fragment} from "react";
import BackDrop from "../BackDrop/BackDrop";
import Modal from "../Modal/Modal";

export default (props) => {
    return props.show ? (
        <Fragment>
            <BackDrop clicked={props.backDropClicked} />
            <Modal>
                {props.children}
            </Modal>
        </Fragment>
    ) : null;
}