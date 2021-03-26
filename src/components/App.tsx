import React from "react"
import {Header} from "./Header"
import "bootstrap/dist/css/bootstrap.css"
import "../css/App.css";

export class App extends React.Component {
    constructor(props: { children: any }) {
        super(props)
    }

    render(): JSX.Element {
        return (
            <div className="app d-flex flex-column">
                <Header/>
                {this.props.children}
            </div>
        )
    }
}