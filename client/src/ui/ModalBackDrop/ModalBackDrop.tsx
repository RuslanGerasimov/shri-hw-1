import React, {Fragment} from "react";
import BackDrop from "../BackDrop/BackDrop";
import Modal from "../Modal/Modal";

const ModalBackDrop: React.FC<{ show?: boolean, backDropClicked: React.EffectCallback }> = (props) => {
    return props.show ? (
        <Fragment>
            <BackDrop clicked={props.backDropClicked} />
            <Modal>
                {props.children}
            </Modal>
        </Fragment>
    ) : null;
};

export default ModalBackDrop;