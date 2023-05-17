import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Card, CardBody, Form, FormGroup, Label, Button, Input, Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap";
import { getAllDifficulties } from "../../modules/DifficultyManager";
import { editBounty, getAllBounties, getBountyById } from "../../modules/BountyManager";
import { editSushi, getSushiById } from "../../modules/SushiManager";

const SushiEditForm = ({ userProfile }) => {
    const [bounties, setBounties] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [sushi, setSushi] = useState({
        name: "",
        description: "",
        price: "",
        inventory: "",
        bountyId: "",
        bounty: {}
    });

    const toggleDropdown = () => setShowDropdown((prevState) => !prevState);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getSushiById(id).then(sushi => setSushi(sushi));
        getAllBounties().then(bounties => setBounties(bounties));
    }, []);

    const handleChange = (e) => {
        const copy = { ...sushi };

        copy[e.target.id] = e.target.value;

        if (e.target.id === "bountyId") {
            copy.bounty.name = e.target.name;
        }

        setSushi(copy);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (sushi.bountyId === 0) {
            sushi.bountyId = sushi.bounty.id;
        }

        editSushi(sushi).then(() => {
            navigate(`/sushi`);
        });
    }

    return (
        <div className="container mt-3 mb-1">
            <Form onSubmit={(e) => handleSubmit(e)} className="text-center mt-2">
                <Card className="mb-3 p-4">
                    <h2>Sushi Edit Form</h2>
                    <CardBody className="p-3 pb-2">
                        <fieldset>
                            <FormGroup>
                                <Label for='name'>Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    autoFocus
                                    value={sushi.name}
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
                                    value={sushi.description}
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='price'>Price</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={sushi.price}
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='inventory'>Inventory</Label>
                                <Input
                                    id="inventory"
                                    type="number"
                                    value={sushi.inventory}
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
                                    value={sushi.imageLocation}
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="bountyId">Bounty</Label>
                                <Dropdown isOpen={showDropdown} toggle={toggleDropdown} className="d-block react-dropdown">
                                    <DropdownToggle color="primary" className="btn btn-sm" caret>{sushi?.bounty?.name}</DropdownToggle>
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

export default SushiEditForm;
