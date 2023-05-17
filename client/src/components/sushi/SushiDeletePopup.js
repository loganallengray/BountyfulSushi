import { Modal, ModalBody, Button, ModalHeader, ModalFooter } from "reactstrap";
import { deleteSushi } from "../../modules/SushiManager";

const SushiDeletePopup = ({ popup, togglePopup, afterDelete }) => {
    const handleDelete = () => {
        deleteSushi(popup.sushi.id)
            .then(e => afterDelete())
            .then(e => togglePopup());
    }

    return (
        <Modal isOpen={popup.show} toggle={togglePopup}>
            <ModalHeader>
                Delete Sushi?
            </ModalHeader>
            <ModalBody>
                <p>
                    {popup.sushi.name}
                </p>
                <p className="mb-1">
                    {popup.sushi.description}
                </p>
            </ModalBody>
            <ModalFooter className="text-center">
                <Button color="danger" onClick={e => handleDelete()}>Confirm</Button>
                <Button color="primary" onClick={e => togglePopup()}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default SushiDeletePopup;