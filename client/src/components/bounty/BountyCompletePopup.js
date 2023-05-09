import { Modal, ModalBody, Button, ModalHeader, ModalFooter, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { deleteUserBounty } from "../../modules/BountyManager";

const UserBountyCompletePopup = ({ popup, togglePopup }) => {
    const navigate = useNavigate();

    const handleComplete = () => {
        deleteUserBounty(popup.userBounty)
            .then(e => { navigate(`../user/${popup.userBounty.userId}`) })
    }

    return (
        <Modal isOpen={popup.show} toggle={togglePopup}>
            <ModalHeader>
                Complete Bounty?
            </ModalHeader>
            <ModalBody>
                <Label for="userId"></Label>
                {/* <Dropdown isOpen={showDropdown} toggle={toggleDropdown} className="d-block react-dropdown">
                    <DropdownToggle color="primary" className="btn btn-sm" caret>{dropdownText}</DropdownToggle>
                    <DropdownMenu>
                        {difficulties.map((difficulty) => {
                            return (
                                <DropdownItem id="difficultyId" name={difficulty.name} value={difficulty.id} key={difficulty.id}
                                    onClick={(e) => {
                                        handleChange(e);
                                    }}>
                                    {difficulty.name}
                                </DropdownItem>
                            );
                        })}
                    </DropdownMenu>
                </Dropdown> */}
            </ModalBody>
            <ModalFooter className="text-center">
                <Button color="danger" onClick={e => handleComplete()}>Confirm</Button>
                <Button color="primary" onClick={e => togglePopup()}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default UserBountyCompletePopup;