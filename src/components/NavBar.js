import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import mainStore from "../store/mainStore";

const NavBar = () => {

    const nav = useNavigate()

    const {logged, setLogged, favorites} = mainStore()

    function logout() {
        localStorage.removeItem("username")
        localStorage.removeItem("secret")
        setLogged(null)
    }

    return (
        <div className={"navBar"}>
            <div className={"navButton"}>
                <Link to="/">Home</Link>
            </div>

            {logged && <div className={"d-flex"}>
                <div className="navButton">
                    <Link to="/create">Make Post</Link>
                </div>
                <div className="navButton">
                    <Link to="/favorites">Favorites ({favorites.length})</Link>
                </div>
            </div>}

            {logged ?
                <div className={"d-flex"}>
                    <div className={"flex-end"}>{logged}</div>
                    <div className="navButton" onClick={logout}>Logout</div>
                </div> :

                <div className={"d-flex"}>
                    <div className={"navButton"}>
                        <Link to="/login">Login</Link>
                    </div>
                    <div className={"navButton"}>
                        <Link to="/register">Register</Link>
                    </div>
            </div>}
        </div>
    );
};

export default NavBar;