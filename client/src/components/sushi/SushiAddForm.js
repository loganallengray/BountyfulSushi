import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardBody, Form, FormGroup, Label, Button, Input, Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap";
import { getAllBounties } from "../../modules/BountyManager";
import { addSushi } from "../../modules/SushiManager";

const SushiAddForm = () => {
    const [sushi, setSushi] = useState({});
    const [bounties, setBounties] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownText, setDropdownText] = useState("Choose Bounty");

    const toggleDropdown = () => setShowDropdown((prevState) => !prevState);
    const navigate = useNavigate();

    useEffect(() => {
        getAllBounties().then(bounties => setBounties(bounties));
    }, []);

    const handleChange = (e) => {
        const copy = { ...sushi };

        copy[e.target.id] = e.target.value;

        if (e.target.id === "bountyId") {
            setDropdownText(e.target.name);
        }

        setSushi(copy);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        addSushi(sushi).then(() => {
            navigate(`/sushi`);
        });
    }

    return (
        <div className="container mt-3 mb-1">
            <Form onSubmit={(e) => handleSubmit(e)} className="text-center mt-2">
                <Card className="mb-3 p-4">
                    <h2>Sushi Creation Form</h2>
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
                                <Label for='description'>Description</Label>
                                <textarea
                                    id="description"
                                    type="text"
                                    className="w-100  p-1 ps-2 pe-2"
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='price'>Price</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='inventory'>Inventory</Label>
                                <Input
                                    id="inventory"
                                    type="number"
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='imageLocation'>Image URL</Label>
                                <textarea
                                    id="imageLocation"
                                    type="text"
                                    className="w-100 p-1 ps-2 pe-2"
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="bountyId">Bounty</Label>
                                <Dropdown isOpen={showDropdown} toggle={toggleDropdown} className="d-block react-dropdown">
                                    <DropdownToggle color="primary" className="btn btn-sm" caret>{dropdownText}</DropdownToggle>
                                    <DropdownMenu>
                                        {bounties.map((bounty) => {
                                            return (
                                                <DropdownItem id="bountyId" name={bounty.name} value={bounty.id} key={bounty.id}
                                                    onClick={(e) => {
                                                        handleChange(e);
                                                    }}>
                                                    {bounty.name}
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

export default SushiAddForm;
