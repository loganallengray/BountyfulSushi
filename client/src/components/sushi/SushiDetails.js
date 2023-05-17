import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import NotFound from "../NotFound";
import { getSushiById } from "../../modules/SushiManager";
import SushiDeletePopup from "./SushiDeletePopup";
import SushiDetailsLogic from "./SushiDetailsLogic";

const SushiDetails = ({ userProfile }) => {
    const [sushi, setSushi] = useState({});
    const [popup, setPopup] = useState({
        show: false,
        sushi: {}
    });

    const { id } = useParams();
    const navigate = useNavigate();

    const getSushi = () => {
        getSushiById(id).then(sushi => setSushi(sushi));
    }

    useEffect(() => {
        if (/\d+/.test(id)) {
            getSushi();
        }
    }, []);

    const handleDeletePopup = () => {
        setPopup({ show: true, sushi: sushi })
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
                                <Link to={`../edit/${sushi.id}`}>
                                    <Button color="primary" className="ms-2">Edit</Button>
                                </Link>
                                <Button color="danger" className="ms-2" onClick={e => handleDeletePopup()}>X</Button>
                            </div>
                            : ""}
                    </div>
                    <div className="flex-row-reverse justify-content-between align-items-top responsive-details">
                        <img src={sushi.imageLocation} width="100%" className="responsive-details-image" />
                        <div className="d-flex flex-column justify-content-center w-100 p-4 bounty-details-card">
                            <div>
                                <h1 className="m-0">{sushi.name}</h1>
                                <h2 className="m-0 mb-2">{sushi.price} Tokens</h2>
                            </div>
                            <div>
                                <strong>
                                    {sushi.inventory} left in stock
                                </strong>
                                <em className="d-block">
                                    {sushi?.bounty?.species}
                                </em>
                                <div>
                                    {sushi.description}
                                </div>
                                <div>
                                    Caught by {sushi?.bounty?.users[0]?.userName}
                                </div>
                                <div>
                                    <SushiDetailsLogic sushi={sushi} userProfile={userProfile} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SushiDeletePopup popup={popup} togglePopup={togglePopup} afterDelete={afterDelete} />
            </>
        )
    } else {
        return <NotFound />
    }
}

export default SushiDetails;
