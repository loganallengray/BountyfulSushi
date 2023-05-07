import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardBody, Form, FormGroup, Label, Button, Input, Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap";
import { getAllDifficulties } from "../../modules/DifficultyManager";
import { addBounty } from "../../modules/BountyManager";

const BountyAddForm = () => {
    const [bounty, setBounty] = useState({});
    const [difficulties, setDifficulties] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownText, setDropdownText] = useState("Choose Difficulty");

    const toggleDropdown = () => setShowDropdown((prevState) => !prevState);
    const navigate = useNavigate();

    useEffect(() => {
        getAllDifficulties().then(difficulties => setDifficulties(difficulties));
    }, []);

    const handleChange = (e) => {
        const copy = { ...bounty };

        copy[e.target.id] = e.target.value;

        if (e.target.id === "difficultyId") {
            setDropdownText(e.target.name);
        }

        setBounty(copy);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        addBounty(bounty).then(() => {
            navigate(`/bounties`);
        });
    }

    return (
        <div className="container mt-3 mb-1">
            <Form onSubmit={(e) => handleSubmit(e)} className="text-center mt-2">
                <Card className="mb-3 p-4">
                    <h2>Bounty Creation Form</h2>
                    <CardBody className="p-3 pb-2">
                        <fieldset>
                            <FormGroup>
                                <Label for='name'>Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    autoFocus
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='Description'>Description</Label>
                                <textarea
                                    id="description"
                                    type="text"
                                    className="w-100  p-1 ps-2 pe-2"
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='Species'>Species</Label>
                                <Input
                                    id="species"
                                    type="text"
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='Location'>Location</Label>
                                <Input
                                    id="location"
                                    type="text"
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='Notes'>Notes</Label>
                                <textarea
                                    id="notes"
                                    type="text"
                                    className="w-100 p-1 ps-2 pe-2"
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="difficultyId">Difficulty</Label>
                                <Dropdown isOpen={showDropdown} toggle={toggleDropdown} className="d-block react-dropdown">
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
                                </Dropdown>
                            </FormGroup>
                            <FormGroup>
                                <Button color="success">Submit</Button>
                            </FormGroup>
                            <Link to={`..`}>
                                <strong>{"Cancel"}</strong>
                            </Link>
                        </fieldset>
                    </CardBody>
                </Card>
            </Form>
        </div>
    )
}

export default BountyAddForm;
