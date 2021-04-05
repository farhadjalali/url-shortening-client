import React, {ChangeEvent, useState} from "react"
import {Link} from "react-router-dom"
import {ILink, AbTestVariant} from "../types";
import "../css/Home.css"
import {ShortenUrl} from "./ShortenUrl";
import {useMutation} from "@apollo/client";

const AB_TEST_SITUATIONS_ALL = 10
const AB_TEST_SITUATIONS_B = 0

export default function Home(): JSX.Element {

    // Todo: typescript issue
    const {longUrl, setLongUrl} = useState<string>("")
    const {message, setMessage} = useState<string>("")
    const {links, setLinks} = useState<ILink[]>([])

    // fields considering A/B test
    let abTestVariantCounter = 0
    let abTestVariant = AbTestVariant.A

    function longUrlChanged(ev: ChangeEvent<HTMLInputElement>): void {
        setLongUrl(ev.target.value)
        setMessage("")
    }

    function gotShortenedUrl(err?: string | null, link?: ILink): void {
        if (err) {
            setMessage(err)
        } else if (link) {
            setLinks([...links, link])
            setMessage("")
        }

        // Set A/B test variant for next call
        // A (70%) : Internal API
        // B (30%) : Bitly API
        abTestVariantCounter++
        abTestVariant = (abTestVariantCounter % AB_TEST_SITUATIONS_ALL < AB_TEST_SITUATIONS_B) ? AbTestVariant.B : AbTestVariant.A
    }

    return (
        <div className="form-home">

            {/* Shorten url */}
            <div className="p-5 bg-secondary">
                <div className="container">

                    {/* Url to shorten */}
                    <div className="input-group">
                        <input value={longUrl} onChange={longUrlChanged} type="text" className="form-control" data-testid="long-url-input"
                               placeholder="Your original URL here" aria-label="URL" aria-describedby="basic-addon"/>
                        <div className="input-group-append">
                            <ShortenUrl longUrl={longUrl} abTestVariant={abTestVariant} gotUrl={gotShortenedUrl}/>
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
                    {message != "" &&
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                    }
                </div>
            </div>

            {/* Shortened links table */}
            <div className="py-5 container">
                {
                    links.reverse().map((link, index) =>
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