import { useMobXStore } from "../../app/stores/root.store";
import { observer } from "mobx-react-lite";
import {Modal} from "semantic-ui-react";


const ModalContainer = () => {
    const { modalStore } = useMobXStore();
    const { modal: { open: isModalOpen, body }, closeModal } = modalStore;

    return (
        <Modal
            open={isModalOpen}
            onClose={closeModal}
            size='mini'
            style={{top: '40%'}}
        >
            <Modal.Content>{body}</Modal.Content>
        </Modal>
    );
}

export default observer(ModalContainer);