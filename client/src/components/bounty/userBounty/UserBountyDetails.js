import React, { useEffect, useState } from "react";
import { getBounty, getUserBounty, getUserBountyById } from "../../../modules/BountyManager";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardBody, Form, FormGroup, Label, Button } from "reactstrap";
import UserBountyRemovePopup from "./UserBountyRemovePopup";
import NotFound from "../../NotFound";

const UserBountyDetails = ({ userProfile }) => {
    const [bounty, setBounty] = useState({});
    const [popup, setPopup] = useState({
        show: false,
        userBounty: {}
    });

    const navigate = useNavigate();
    const { userId, id } = useParams();

    useEffect(() => {
        getBountyById();
    }, []);

    const getBountyById = () => {
        if (/\d+/.test(id)) {
            const userBounty = { userId: userId, bountyId: id }

            getUserBountyById(userBounty).then(bounty => setBounty(bounty));
        }
    }

    const handleRemovePopup = (bounty) => {
        setPopup({
            show: true, userBounty: {
                userId: userProfile.id,
                bountyId: bounty.id,
                bounty: bounty
            }
        })
    }

    const togglePopup = () => {
        const copy = { ...popup };

        copy.show = !popup.show;

        setPopup(copy);
    }

    const afterRemove = () => {
        navigate(`../user/${userProfile.id}`);
    }

    return (
        <>
            <div className="container mt-3 mb-1">
                <Link to={`../user/${userProfile.id}`}>
                    <strong>{"<< Back"}</strong>
                </Link>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h1>{bounty.name}</h1>
                        <h2>{bounty?.difficulty?.name}</h2>
                    </div>
                    {bounty.dateCompleted === null ? <div className="text-center mt-2">
                        <div>
                            <Button color="danger" onClick={e => handleRemovePopup(bounty)}>X</Button>
                        </div>
                    </div> : ""}
                </div>
                <img src={bounty.imageLocation} width="100%" />
                <div>
                    <div>
                        {bounty.species}
                    </div>
                    <div>
                        {bounty.location}
                    </div>
                    <div>
                        {bounty.description}
                    </div>
                    <div>
                        {bounty.notes}
                    </div>
                </div>
            </div>
            <UserBountyRemovePopup popup={popup} togglePopup={togglePopup} afterRemove={afterRemove} />
        </>
    )
}

export default UserBountyDetails;
