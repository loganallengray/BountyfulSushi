import { Modal, ModalBody, Button, ModalHeader, ModalFooter, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import { completeBounty } from "../../modules/BountyManager";

const UserBountyCompletePopup = ({ popup, togglePopup }) => {
    const [userChoice, setUserChoice] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownText, setDropdownText] = useState("Choose User");

    const toggleDropdown = () => setShowDropdown((prevState) => !prevState);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setDropdownText(e.target.name);

        setUserChoice(e.target.value);
    }

    const handleComplete = () => {
        if (userChoice !== 0) {
            const userBounty = {
                userId: userChoice,
                bountyId: popup.bounty.id,
                bounty: popup.bounty
            }

            completeBounty(userBounty)
                .then(e => { navigate(`..`) })
        }
    }

    if (popup.bounty.users !== undefined) {
        return (
            <Modal isOpen={popup.show} toggle={togglePopup}>
                <ModalHeader className="d-flex justify-content-center">
                    Complete Bounty?
                </ModalHeader>
                <ModalBody className="text-center">
                    <Label for="userId">Choose a User</Label>
                    <Dropdown isOpen={showDropdown} toggle={toggleDropdown} className="d-block react-dropdown">
                        <DropdownToggle color="primary" className="btn btn-sm" caret>{dropdownText}</DropdownToggle>
                        <DropdownMenu>
                            {popup.bounty.users.map((user) => {
                                return (
                                    <DropdownItem id="userId" name={user.userName} value={user.id} key={user.id}
                                        onClick={(e) => {
                                            handleChange(e);
                                        }}>
                                        {user.userName}
                                    </DropdownItem>
                                );
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </ModalBody>
                <ModalFooter className="d-flex justify-content-center">
                    <Button color="success" onClick={e => handleComplete()}>Confirm</Button>
                    <Button color="primary" onClick={e => togglePopup()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default UserBountyCompletePopup;