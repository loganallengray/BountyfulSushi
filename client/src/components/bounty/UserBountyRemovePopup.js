import { Modal, ModalBody, Button, ModalHeader, ModalFooter } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { deleteUserBounty } from "../../modules/BountyManager";

const UserBountyRemovePopup = ({ popup, togglePopup, getBounties }) => {
    const navigate = useNavigate();

    const handleRemove = () => {
        deleteUserBounty(popup.userBounty)
            .then(e => {
                if (getBounties === undefined || getBounties === null) {
                    navigate(`../user/${popup.userBounty.userId}`)
                } else {
                    getBounties()
                }
            })
            .then(e => togglePopup());
    }

    return (
        <Modal isOpen={popup.show} toggle={togglePopup}>
            <ModalHeader>
                Remove Bounty?
            </ModalHeader>
            <ModalBody>
                <p>
                    {popup?.userBounty?.bounty?.name}
                </p>
                <p className="mb-1">
                    {popup?.userBounty?.bounty?.description}
                </p>
            </ModalBody>
            <ModalFooter className="text-center">
                <Button color="danger" onClick={e => handleRemove()}>Confirm</Button>
                <Button color="primary" onClick={e => togglePopup()}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default UserBountyRemovePopup;