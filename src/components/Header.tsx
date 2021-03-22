import React from "react";
import {Link} from "react-router-dom";

export const Header = (): JSX.Element => {
    return (
        <header>
            <nav className="navbar container">
                <Link className="navbar-brand mr-auto h2 text-dark" to="/">URL Shortener</Link>
            </nav>
        </header>
    )
}