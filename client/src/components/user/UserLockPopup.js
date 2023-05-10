import { Modal, ModalBody, Button, ModalHeader, ModalFooter } from "reactstrap";
import { useNavigate } from "react-router-dom";

const UserBountyLockPopup = ({ popup, togglePopup }) => {
    const navigate = useNavigate();

    const handleLock = () => {
        // deleteUserBounty(popup.userBounty)
        //     .then(e => {
        //         if (getBounties === undefined || getBounties === null) {
        //             navigate(`../user/${popup.userBounty.userId}`)
        //         } else {
        //             getBounties()
        //         }
        //     })
        //     .then(e => togglePopup());
    }

    return (
        <Modal isOpen={popup.show} toggle={togglePopup}>
            <ModalHeader>
                Lock User's Account?
            </ModalHeader>
            <ModalBody>
                <p>
                    {popup?.user?.name}
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

export default UserBountyLockPopup;