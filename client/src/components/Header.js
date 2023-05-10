import React from "react";
import HeaderLogic from "./HeaderLogic";
import { Link } from "react-router-dom";
import { logout } from "../modules/AuthManager";

const Header = ({ isLoggedIn, userProfile }) => {
    return (
        <nav className="navbar navbar-expand navbar-custom">
            <Link to="/" className="navbar-brand ps-4 pe-2 pt-0 pb-0">
                Bountyful Sushi
            </Link>
            <ul className="navbar-nav justify-content-between w-100 d-flex align-items-center">
                <li className="d-flex"> {isLoggedIn ?
                    <HeaderLogic userProfile={userProfile} />
                    : ""}
                </li>
                <li className="d-flex"> {isLoggedIn ?
                    <>  {/* Logged in account options */}
                        <div className="nav-link navbar-text p-2 d-flex">
                            <div className="d-flex align-items-center me-2">
                                <img src={userProfile?.imageLocation} width="30px" height="30px" className="rounded-images" />
                            </div>
                            <div className="d-flex align-items-center">
                                {userProfile?.userName}
                            </div>
                        </div>
                        <div className="p-2 pe-4 d-flex align-items-center">
                            <Link onClick={(e) => logout()} className="nav-link navbar-text p-0">
                                Logout
                            </Link>
                        </div>
                    </> :
                    <> {/* Logged out, login/register */}
                        <div className="p-2 d-flex align-items-center">
                            <Link to="/login" className="nav-link navbar-text p-0">
                                Login
                            </Link>
                        </div>
                        <div className="p-2 pe-4 d-flex align-items-center">
                            <Link to="/register" className="nav-link navbar-text p-0">
                                Register
                            </Link>
                        </div>
                    </>
                }
                </li>
            </ul>
        </nav>
    );
};

export default Header;