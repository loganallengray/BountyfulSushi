import { Modal, ModalBody, Button, ModalHeader, ModalFooter } from "reactstrap";
import { deleteSushiOrder } from "../../../modules/SushiOrderManager";

const OrderDeletePopup = ({ popup, togglePopup, afterDelete }) => {
    const handleDelete = () => {
        deleteSushiOrder(popup.order)
            .then(e => afterDelete())
            .then(e => togglePopup());
    }

    return (
        <Modal isOpen={popup.show} toggle={togglePopup}>
            <ModalHeader>
                Delete Order?
            </ModalHeader>
            <ModalBody>
                <p>
                    {popup.order?.sushi?.name}
                </p>
                <p className="mb-1">
                    {popup.order?.user?.firstName} {popup.order?.user?.lastName}
                </p>
            </ModalBody>
            <ModalFooter className="text-center">
                <Button color="danger" onClick={e => handleDelete()}>Confirm</Button>
                <Button color="primary" onClick={e => togglePopup()}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default OrderDeletePopup;