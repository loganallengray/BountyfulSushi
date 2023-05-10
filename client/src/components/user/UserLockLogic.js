import { Button } from "reactstrap";

const UserLockLogic = ({ user, handleLockPopup }) => {
    if (user.locked) {
        return (
            <Button color="success" className="ms-2" onClick={e => handleLockPopup(user, true)}>Unlock</Button>
        );
    } else {
        return (
            <Button color="danger" className="ms-2" onClick={e => handleLockPopup(user, false)}>Lock</Button>
        );
    }
}

export default UserLockLogic;