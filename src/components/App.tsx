import React from "react"
import {Header} from "./Header"
import "bootstrap/dist/css/bootstrap.css"
import "../css/App.css";

export const App = (props: { children: unknown }): JSX.Element => {
    return (
        <div className="app d-flex flex-column">
            <Header/>
            {props.children}
        </div>
    )
}