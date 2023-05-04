import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../modules/authManager";

const Header = ({ isLoggedIn, userProfile }) => {
    return (
        <nav className="navbar navbar-expand navbar-custom">
            <Link to="/" className="navbar-brand ps-4 pe-2">
                Bountyful Sushi
            </Link>
            <ul className="navbar-nav justify-content-between w-100">
                <li className="d-flex"> {isLoggedIn ?
                    <> {/* Logged in header */}
                        <div className="d-flex">
                            <div className="p-2">
                                <Link to="/bounties" className="nav-link navbar-text p-0">
                                    Bounties
                                </Link>
                            </div>
                            <div className="p-2">
                                <Link to="/userbounties" className="nav-link navbar-text p-0">
                                    My Bounties
                                </Link>
                            </div>
                        </div>
                    </> :
                    <> {/* Logged out header */}
                    </>}
                </li>
                <li className="d-flex"> {isLoggedIn ?
                    <>  {/* Logged in header */}
                        <div className="nav-link navbar-text p-2">
                            {userProfile?.name}
                        </div>
                        <div className="p-2 pe-4">
                            <Link onClick={(e) => logout()} className="nav-link navbar-text p-0">
                                Logout
                            </Link>
                        </div>
                    </> :
                    <>  {/* Logged out header */}
                        <div className="p-2">
                            <Link to="/login" className="nav-link navbar-text p-0">
                                Login
                            </Link>
                        </div>
                        <div className="p-2 pe-4">
                            <Link to="/register" className="nav-link navbar-text p-0">
                                Register
                            </Link>
                        </div>
                    </>}
                </li>
            </ul>
        </nav>
    );
};

export default Header;