import { Modal, ModalBody, Button, ModalHeader, ModalFooter } from "reactstrap";

const OrderCompletePopup = ({ popup, togglePopup, afterComplete }) => {
    const handleComplete = () => {
        // deleteSushiOrder(popup.order.id)
        //     .then(e => afterComplete())
        //     .then(e => togglePopup());
    }

    return (
        <Modal isOpen={popup.show} toggle={togglePopup}>
            <ModalHeader>
                Complete Order?
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
                <Button color="success" onClick={e => handleComplete()}>Confirm</Button>
                <Button color="primary" onClick={e => togglePopup()}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default OrderCompletePopup;