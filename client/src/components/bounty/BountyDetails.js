import React, { useEffect, useState } from "react";
import { getBountyById } from "../../modules/BountyManager";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import NotFound from "../NotFound";
import BountyDeletePopup from "./BountyDeletePopup";
import BountyDetailsLogic from "./BountyDetailsLogic";

const BountyDetails = ({ userProfile }) => {
    const [bounty, setBounty] = useState({});
    const [popup, setPopup] = useState({
        show: false,
        bounty: {}
    });

    const { id } = useParams();
    const navigate = useNavigate();

    const getBounty = () => {
        getBountyById(id).then(bounty => setBounty(bounty));
    }

    useEffect(() => {
        if (/\d+/.test(id)) {
            getBounty();
        }
    }, []);

    const handleDeletePopup = () => {
        setPopup({ show: true, bounty: bounty })
    }

    const togglePopup = () => {
        const copy = { ...popup };

        copy.show = !popup.show;

        setPopup(copy);
    }

    const afterDelete = () => {
        navigate("..");
    }

    if (/\d+/.test(id)) {
        return (
            <>
                <div className="container mt-3 mb-1">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <Link to={`..`}>
                            <strong>{"<< Back"}</strong>
                        </Link>
                        {userProfile?.userType?.id === 1 ?
                            <div className="d-flex align-items-center justify-content-center ms-3">
                                <Link to={`../edit/${bounty.id}`}>
                                    <Button color="primary" className="ms-2">Edit</Button>
                                </Link>
                                <Button color="danger" className="ms-2" onClick={e => handleDeletePopup()}>X</Button>
                            </div>
                            : ""}
                    </div>
                    <div className="flex-row-reverse justify-content-between align-items-top responsive-details">
                        <img src={bounty.imageLocation} width="100%" className="responsive-details-image" />
                        <div className={typeof bounty.dateCompleted === "string" ? "d-flex flex-column justify-content-center w-100 p-4 bounty-details-card-complete"
                            : "d-flex flex-column justify-content-center w-100 p-4 bounty-details-card"}>
                            <div>
                                <h1 className="m-0">{bounty.name}</h1>
                                <h2 className="m-0 mb-2">{bounty?.difficulty?.name}</h2>
                            </div>
                            <div>
                                <strong>
                                    {bounty.species}
                                </strong>
                                <em className="d-block">
                                    {bounty.location}
                                </em>
                                <div>
                                    {bounty.description}
                                </div>
                                <div>
                                    {bounty.notes}
                                </div>
                                <div>
                                    <BountyDetailsLogic bounty={bounty} userProfile={userProfile} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <BountyDeletePopup popup={popup} togglePopup={togglePopup} afterDelete={afterDelete} />
            </>
        )
    } else {
        return <NotFound />
    }
}

export default BountyDetails;
