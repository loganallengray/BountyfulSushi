import { Modal, ModalBody, Button, ModalHeader, ModalFooter } from "reactstrap";
import { deleteBounty } from "../../modules/BountyManager";

const BountyDeletePopup = ({ popup, togglePopup, getBounties }) => {
    const handleDelete = () => {
        deleteBounty(popup.bounty.id)
            .then(e => getBounties())
            .then(e => togglePopup());
    }

    return (
        <Modal isOpen={popup.show} toggle={togglePopup}>
            <ModalHeader>
                Delete Bounty?
            </ModalHeader>
            <ModalBody>
                <p>
                    {popup.bounty.name}
                </p>
                <p className="mb-1">
                    {popup.bounty.description}
                </p>
            </ModalBody>
            <ModalFooter className="text-center">
                <Button color="danger" onClick={e => handleDelete()}>Confirm</Button>
                <Button color="primary" onClick={e => togglePopup()}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default BountyDeletePopup;