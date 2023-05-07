import { Link } from "react-router-dom";

const HeaderLogic = ({ userProfile }) => {
    if (userProfile?.userType?.id === 1) {
        return (
            <>
                <div className="d-flex">
                    <div className="p-2">
                        <Link to={`/bounties`} className="nav-link navbar-text p-0">
                            Bounty Management
                        </Link>
                    </div>
                    <div className="p-2">
                        <Link to={`/users`} className="nav-link navbar-text p-0">
                            User Management
                        </Link>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="p-2">
                    <Link to="/bounties" className="nav-link navbar-text p-0">
                        Bounties
                    </Link>
                </div>
                <div className="p-2">
                    <Link to={`/bounties/user/${userProfile?.id}`} className="nav-link navbar-text p-0">
                        My Bounties
                    </Link>
                </div>
            </>
        )
    }
}

export default HeaderLogic;