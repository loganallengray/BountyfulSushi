import { Link } from "react-router-dom";

const HeaderLogic = ({ userProfile }) => {
    if (userProfile?.userType?.id === 1) {
        return (
            <>
                <Link to={`/bounties`} className="nav-link navbar-text navbar-gold-links">
                    Bounties
                </Link>
                <Link to={`/sushi`} className="nav-link navbar-text navbar-gold-links">
                    Sushi
                </Link>
                <Link to={`/users`} className="nav-link navbar-text navbar-gold-links">
                    Users
                </Link>
            </>
        )
    } else {
        return (
            <>
                <Link to="/bounties" className="nav-link navbar-text navbar-gold-links">
                    Bounties
                </Link>
                <Link to={`/sushi`} className="nav-link navbar-text navbar-gold-links">
                    Sushi
                </Link>
                <Link to={`/bounties/user/${userProfile?.id}`} className="nav-link navbar-text navbar-gold-links">
                    My Bounties
                </Link>
            </>
        )
    }
}

export default HeaderLogic;