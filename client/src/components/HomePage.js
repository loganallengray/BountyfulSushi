import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const HomePage = () => {
    return (
        <>
            <div id="homepage-1" className="d-flex justify-content-center align-items-center text-center">
                <div className="text-center image-text-box">
                    <h1>What is Bountyful Sushi?</h1>
                    <p>Bountyful Sushi is an app controlled by an admin user,
                        Mr. Fujimoto, who is well known as one of the best sushi chefs in the world.
                        Mr. Fujimoto's path to wealth and fame has exhausted him, but he still wishes to cook, even in retirement.
                        The shops near his home do not have many of the ingredients he needs.
                        That is where Bountyful Sushi comes in.</p>
                </div>
            </div>
            <div id="homepage-2" className="d-flex flex-column justify-content-around align-items-center text-center vh-100">
                <div className="w-50">
                    <h1>Joining and Participating</h1>
                    <p>Anyone can register an account and become a user on Bountyful Sushi.
                        Once you do, you will have access to the Bounties and My Bounties pages.
                        Mr. Fujimoto uses his vast amount of knowledge and connections to locate high quality fish in the wild.
                        He will then post these findings onto the Bounties page, which you can view and accept.
                        You can view your previously completed and currently accepted bounties on the My Bounties page.
                        Once you accept a bounty, you are free to unaccept it on your My Bounties page.
                    </p>
                </div>
                <div className="w-50">
                    <h1>Completing Bounties</h1>
                    <p>Mr. Fujimoto requires fresh fish, if you do hope to meet his standards then get in your bounties
                        as soon as possible.
                        You may use any equipment to catch them, but we advise against the use of guns, explosives,
                        and anything else that may ruin the meat.
                        Be wary not to take on more than you can handle, and keep in mind that there may
                        be others working on the same bounty as you. First come, first serve.
                    </p>
                </div>
                <div className="w-50">
                    <h1>Sweet Victory</h1>
                    <p>Once you have completed a bounty, you are awarded an amount of tokens, based upon how
                        difficult to complete the bounty was. With these tokens, you can purchase a
                        homemade meal from Mr. Fujimoto himself. These are delivered with extreme speed, and we
                        personally ensure that the food's transportation does not affect the quality.
                    </p>
                </div>
            </div>
            <div id="homepage-3" className="d-flex justify-content-center align-items-center text-center">
                <div className="text-center image-text-box">
                    <h1>Register Today</h1>
                    <p>Beyond just the good sushi, Mr. Fujimoto believes that a strong work ethic is vital.
                        If you're feeling a little lost in life, or need a new hobby, maybe fishing
                        could be the thing to get you out of your rut?
                    </p>
                    <Link to="register">
                        <Button>Join Bountyful Sushi</Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default HomePage;