import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { getAllSushi } from "../../modules/SushiManager";
import Sushi from "./Sushi";
import SushiDeletePopup from "./SushiDeletePopup";

const SushiList = ({ userProfile }) => {
    const [sushi, setSushi] = useState([]);
    const [popup, setPopup] = useState({
        show: false,
        sushi: {}
    });

    const getSushi = () => {
        getAllSushi().then(sushi => setSushi(sushi));
    };

    useEffect(() => {
        getSushi();
    }, []);

    const handleDeletePopup = (sushi) => {
        setPopup({ show: true, sushi: sushi })
    }

    const togglePopup = () => {
        const copy = { ...popup };

        copy.show = !popup.show;

        setPopup(copy);
    }

    const afterDelete = () => {
        getSushi();
    }

    return (
        <>
            <div className="container mt-3 mb-1">
                {userProfile?.userType?.id === 1 ?
                    <div className="text-center">
                        <Link to="add">
                            <Button color="primary">Add Sushi</Button>
                        </Link>
                    </div> : ""}
                <div className="row justify-content-center">
                    {sushi.map((sushi) => (
                        <Sushi sushi={sushi} key={sushi.id} userProfile={userProfile} handleDeletePopup={handleDeletePopup} />
                    ))}
                    <SushiDeletePopup popup={popup} togglePopup={togglePopup} afterDelete={afterDelete} />
                </div>
            </div>
        </>
    );
};

export default SushiList;