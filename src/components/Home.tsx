import React, {ChangeEvent} from "react"
import {Link} from "react-router-dom"
import {gql, useMutation} from '@apollo/client'
import {Constants, ILink} from "../types";
import "./Home.css"

const SHORTEN_URL = gql`
    mutation ShortenUrl($longUrl: String!) {
        shortenUrl(longUrl: $longUrl){
            id
            url
            hash
        }
    }
`

function ShortenUrl(props: { longUrl: string, result: (err?: string | null, link?: ILink) => void }) {
    const [callShortenUrl] = useMutation(SHORTEN_URL)

    return (
        <button onClick={async () => {
            if (!Constants.urlRegex.test(props.longUrl)) {
                props.result("Please enter a valid url")
                return
            }

            const res = await callShortenUrl({variables: {longUrl: props.longUrl}})
            res.errors
            props.result(null, res.data)

        }} className="btn btn-warning text-uppercase" type="button">Shorten Url
        </button>
    )
}

export class Home extends React.Component<{ onTemperatureChange: (value: string) => void }> {

    constructor(props: { onTemperatureChange: (value: string) => void }) {
        super(props)

        this.longUrlChanged = this.longUrlChanged.bind(this)
        this.onShortenUrl = this.onShortenUrl.bind(this)
    }

    state = {
        longUrl: "",
        message: "",
        links: [] as ILink[]
    }

    onShortenUrl(err?: string | null, link?: ILink): void {
        if (err) {
            this.setState({message: err})
            return
        }

        if (link) {
            const joined = this.state.links.concat(link)
            this.setState({links: joined})
        }
    }

    longUrlChanged(ev: ChangeEvent<HTMLInputElement>): void {
        this.setState({longUrl: ev.target.value, message: ""})
    }

    render(): JSX.Element {
        return (
            <div>
                <div className="p-5 bg-secondary">
                    <div className="container">

                        {/* Url to shorten */}
                        <div className="input-group">
                            <input value={this.state.longUrl} onChange={this.longUrlChanged} type="text" className="form-control"
                                   placeholder="Your original URL here" aria-label="URL" aria-describedby="basic-addon2"/>
                            <div className="input-group-append">
                                <ShortenUrl longUrl={this.state.longUrl} result={this.onShortenUrl}/>
                            </div>
                        </div>

                        {/* Terms & Privacy policy warning */}
                        <p className="text-white-50 small py-2 text-right">
                            By clicking SHORTEN, you are agreeing to our
                            <Link className="text-white px-1" to="/terms">Terms of Service</Link>
                            and
                            <Link className="text-white px-1" to="/privacy-policy">Privacy Policy</Link>
                        </p>


                        {/* Error message */}
                        {this.state.message != "" &&
                        <div className="alert alert-danger" role="alert">
                            {this.state.message}
                        </div>
                        }
                    </div>
                </div>
                <div className="py-5 container bg-light">
                    {
                        this.state.links.map(link => {
                            return (
                                <div key={link.id} className="link-item">
                                    <div className="small text-secondary">{link.url}</div>
                                    <div className="text-dark">{link.hash}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}