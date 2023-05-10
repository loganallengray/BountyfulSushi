import { Modal, ModalBody, Button, ModalHeader, ModalFooter } from "reactstrap";
import { toggleLock } from "../../modules/UserManager";

const UserBountyLockPopup = ({ popup, togglePopup, afterToggleLock }) => {
    const handleLock = () => {
        toggleLock(popup.user.id)
            .then(e => afterToggleLock())
            .then(e => togglePopup())
    }

    if (popup.locked) {
        return (
            <Modal isOpen={popup.show} toggle={togglePopup}>
                <ModalHeader>
                    Unlock User's Account?
                </ModalHeader>
                <ModalBody>
                    <p>
                        {popup?.user?.userName}
                    </p>
                    <p className="mb-1">
                        {popup?.user?.email}
                    </p>
                </ModalBody>
                <ModalFooter className="text-center">
                    <Button color="success" onClick={e => handleLock()}>Confirm</Button>
                    <Button color="primary" onClick={e => togglePopup()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    } else {
        return (
            <Modal isOpen={popup.show} toggle={togglePopup}>
                <ModalHeader>
                    Lock User's Account?
                </ModalHeader>
                <ModalBody>
                    <p>
                        {popup?.user?.userName}
                    </p>
                    <p className="mb-1">
                        {popup?.user?.email}
                    </p>
                </ModalBody>
                <ModalFooter className="text-center">
                    <Button color="danger" onClick={e => handleLock()}>Confirm</Button>
                    <Button color="primary" onClick={e => togglePopup()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default UserBountyLockPopup;