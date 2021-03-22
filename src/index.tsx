import React from "react";
import {render} from "react-dom";
import {Route, BrowserRouter as Router} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"
import "./index.css";
import {Home} from "./components/Home";
import reportWebVitals from "./reportWebVitals";
import {App} from "./components/App";
import {PrivacyPolicy} from "./components/PrivacyPolicy";
import {Terms} from "./components/Terms";
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:3400/graphql',
    cache: new InMemoryCache(),
});

// client.query({
//     query: gql`
//         query ExpandUrl {
//             expandUrl(hash: "cjme") {
//                 id
//                 url
//                 hash
//             }
//         }
//     `
// })
// .then(result => console.log(result.data.expandUrl));

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
