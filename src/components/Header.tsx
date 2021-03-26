import React from "react";
import {Link} from "react-router-dom";

export class Header extends React.Component {
    constructor(props: any) {
        super(props)
    }

    render(): JSX.Element {
        return (
            <header>
                <nav className="navbar container">
                    <Link className="navbar-brand mr-auto h2 text-dark" to="/">URL Shortener</Link>
                </nav>
            </header>
        )
    }
}