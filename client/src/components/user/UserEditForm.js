import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Card, CardBody, Form, FormGroup, Label, Button, Input, Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap";
import { editUser, getUser, getUserTypes } from "../../modules/UserManager";

const UserEditForm = ({ userProfile }) => {
    const [userTypes, setUserTypes] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        imageLocation: "",
        userType: {
            id: 0,
            name: ""
        }
    });

    const toggleDropdown = () => setShowDropdown((prevState) => !prevState);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getUser(id).then(user => setUser(user));
        getUserTypes().then(userTypes => setUserTypes(userTypes));
    }, []);

    const handleChange = (e) => {
        const copy = { ...user };

        if (e.target.id === "userTypeId") {
            copy.userType.id = e.target.value;
            copy.userType.name = e.target.name;
        } else {
            copy[e.target.id] = e.target.value;
        }

        setUser(copy);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // editUser(user).then(() => {
        //     navigate(`/bounties`);
        // });
    }

    return (
        <div className="container mt-3 mb-1">
            <Form onSubmit={(e) => handleSubmit(e)} className="text-center mt-2">
                <h2>User Edit Form</h2>
                <fieldset>
                    <FormGroup>
                        <Label for='name'>Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={user.name}
                            required
                            onChange={(e) => handleChange(e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='email'>Email</Label>
                        <textarea
                            id="email"
                            type="text"
                            value={user.email}
                            className="w-100  p-1 ps-2 pe-2"
                            required
                            onChange={(e) => handleChange(e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='imageLocation'>Image URL</Label>
                        <Input
                            id="imageLocation"
                            type="text"
                            value={user.imageLocation}
                            required
                            onChange={(e) => handleChange(e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="userTypeId">User Type</Label>
                        <Dropdown isOpen={showDropdown} toggle={toggleDropdown} className="d-block react-dropdown">
                            <DropdownToggle color="primary" className="btn btn-sm" caret>{user.userType.name}</DropdownToggle>
                            <DropdownMenu>
                                {userTypes.map((user) => {
                                    return (
                                        <DropdownItem id="userTypeId" name={user.name} value={user.id} key={user.id}
                                            onClick={(e) => {
                                                handleChange(e);
                                            }}>
                                            {user.name}
                                        </DropdownItem>
                                    );
                                })}
                            </DropdownMenu>
                        </Dropdown>
                    </FormGroup>
                    <FormGroup>
                        <Button color="success">Submit</Button>
                    </FormGroup>
                    <Link to={`..`}>
                        <strong>{"Cancel"}</strong>
                    </Link>
                </fieldset>
            </Form>
        </div>
    )
}

export default UserEditForm;
