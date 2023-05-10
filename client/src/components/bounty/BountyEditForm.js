import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Card, CardBody, Form, FormGroup, Label, Button, Input, Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap";
import { getAllDifficulties } from "../../modules/DifficultyManager";
import { editBounty, getBounty } from "../../modules/BountyManager";

const BountyEditForm = ({ userProfile }) => {
    const [difficulties, setDifficulties] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [bounty, setBounty] = useState({
        name: "",
        description: "",
        species: "",
        location: "",
        notes: "",
        difficultyId: "",
        difficulty: {}
    });

    const toggleDropdown = () => setShowDropdown((prevState) => !prevState);
    const navigate = useNavigate();
    const { id, userId } = useParams();

    useEffect(() => {
        const userBounty = { userId: userProfile.id, bountyId: id }

        getBounty(userBounty).then(bounty => setBounty(bounty));
        getAllDifficulties().then(difficulties => setDifficulties(difficulties));
    }, []);

    const handleChange = (e) => {
        const copy = { ...bounty };

        copy[e.target.id] = e.target.value;

        if (e.target.id === "difficultyId") {
            copy.difficulty.name = e.target.name;
        }

        setBounty(copy);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (bounty.difficultyId === 0) {
            bounty.difficultyId = bounty.difficulty.id;
        }

        editBounty(bounty).then(() => {
            navigate(`/bounties`);
        });
    }

    return (
        <div className="container mt-3 mb-1">
            <Form onSubmit={(e) => handleSubmit(e)} className="text-center mt-2">
                <Card className="mb-3 p-4">
                    <h2>Bounty Edit Form</h2>
                    <CardBody className="p-3 pb-2">
                        <fieldset>
                            <FormGroup>
                                <Label for='name'>Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={bounty.name}
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='Description'>Description</Label>
                                <textarea
                                    id="description"
                                    type="text"
                                    value={bounty.description}
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
                                    value={bounty.species}
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='Location'>Location</Label>
                                <Input
                                    id="location"
                                    type="text"
                                    value={bounty.location}
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='Notes'>Notes</Label>
                                <textarea
                                    id="notes"
                                    type="text"
                                    value={bounty.notes}
                                    className="w-100 p-1 ps-2 pe-2"
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="difficultyId">Difficulty</Label>
                                <Dropdown isOpen={showDropdown} toggle={toggleDropdown} className="d-block react-dropdown">
                                    <DropdownToggle color="primary" className="btn btn-sm" caret>{bounty?.difficulty?.name}</DropdownToggle>
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

export default BountyEditForm;
