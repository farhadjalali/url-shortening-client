import React from "react";
import {render} from "react-dom";
import {Route, BrowserRouter as Router} from "react-router-dom";
import {Home} from "./components/Home";
import reportWebVitals from "./reportWebVitals";
import {App} from "./components/App";
import {PrivacyPolicy} from "./components/PrivacyPolicy";
import {Terms} from "./components/Terms";
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import env from "dotenv";
import assert from "assert";

env.config()

assert(process.env.REACT_APP_SERVER_URL, 'Environment variable "REACT_APP_SERVER_URL" is expected')

const client = new ApolloClient({
    uri: process.env.REACT_APP_SERVER_URL,
    cache: new InMemoryCache()
});

render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Router>
                <App>
                    <Route exact path="/" component={Home}/>
                    <Route path="/privacy-policy" component={PrivacyPolicy}/>
                    <Route path="/terms" component={Terms}/>
                </App>
            </Router>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
)


// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
