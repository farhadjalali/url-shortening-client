import React from "react";
import {Header} from "./Header";

export const App = (props: { children: unknown }): JSX.Element => {
    return (
        <div className="app d-flex flex-column">
            <Header/>
            {props.children}
        </div>
    )
}