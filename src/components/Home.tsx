import React, {ChangeEvent} from "react"
import {Link} from "react-router-dom"
import {ILink, AbTestVariant} from "../types";
import "../css/Home.css"
import ShortenUrl from "./ShortenUrl";

const AB_TEST_SITUATIONS_ALL = 10
const AB_TEST_SITUATIONS_B = 3

export class Home extends React.Component {
    constructor(props: any) {
        super(props)

        this.longUrlChanged = this.longUrlChanged.bind(this)
        this.gotShortenedUrl = this.gotShortenedUrl.bind(this)
    }

    state = {
        longUrl: "",
        message: "",
        links: [] as ILink[]
    }

    // fields considering A/B test
    private abTestVariantCounter = 0
    private abTestVariant = AbTestVariant.A

    gotShortenedUrl(err?: string | null, link?: ILink): void {
        if (err) {
            this.setState({message: err})
        } else if (link) {
            const links = [...this.state.links, link]
            this.setState({links, message: ""})
        }

        // Set A/B test variant for next call
        // A (70%) : Internal API
        // B (30%) : Bitly API
        this.abTestVariantCounter++
        this.abTestVariant = (this.abTestVariantCounter % AB_TEST_SITUATIONS_ALL < AB_TEST_SITUATIONS_B) ? AbTestVariant.B : AbTestVariant.A
    }

    longUrlChanged(ev: ChangeEvent<HTMLInputElement>): void {
        this.setState({longUrl: ev.target.value, message: ""})
    }

    render(): JSX.Element {
        return (
            <div className="form-home">

                {/* Shorten url */}
                <div className="p-5 bg-secondary">
                    <div className="container">

                        {/* Url to shorten */}
                        <div className="input-group">
                            <input value={this.state.longUrl} onChange={this.longUrlChanged} type="text" className="form-control" data-testid="long-url-input"
                                   placeholder="Your original URL here" aria-label="URL" aria-describedby="basic-addon"/>
                            <div className="input-group-append">
                                <ShortenUrl longUrl={this.state.longUrl} abTestVariant={this.abTestVariant} gotUrl={this.gotShortenedUrl}/>
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

                {/* Shortened links table */}
                <div className="py-5 container">
                    {
                        this.state.links.reverse().map((link, index) =>
                            <div key={index} className="link-item border-bottom py-2">
                                <div className="small text-secondary"><b>Original Url:</b> {link.longUrl}</div>
                                <div className="text-dark">{link.url}</div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}