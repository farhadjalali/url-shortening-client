import {Constants, ILink, AbTestVariant} from "../types";
import {gql, useMutation} from "@apollo/client";
import React from "react";

const SHORTEN_URL = gql`
    mutation ShortenUrl($longUrl: String!) {
        shortenUrl(longUrl: $longUrl){
            url
            longUrl
        }
    }
`

export class ShortenUrl extends React.Component<{
    longUrl: string,
    abTestVariant: AbTestVariant,
    gotUrl: (err?: string | null, link?: ILink) => void
}> {
    constructor(props: {
        longUrl: string,
        abTestVariant: AbTestVariant,
        gotUrl: (err?: string | null, link?: ILink) => void
    }) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    async handleClick() {
        if (!Constants.URL_REGEX.test(this.props.longUrl)) {
            this.props.gotUrl("Please enter a valid url")
            return
        }

        switch (this.props.abTestVariant) {
            // Call Internal API
            case AbTestVariant.A: {
                const [callShortenUrl] = useMutation(SHORTEN_URL)
                // TODO: Complete error handling

                try {
                    const res = await callShortenUrl({
                            variables: {
                                longUrl: this.props.longUrl
                            }
                        }
                    )
                    this.props.gotUrl(null, res.data.shortenUrl)
                } catch (error) {
                    this.props.gotUrl(error ? error.toString() : null)
                }
                break
            }

            // Call Bitly API
            case AbTestVariant.B: {
                const content = {
                    long_url: this.props.longUrl,
                    domain: process.env.REACT_APP_BITLY_DOMAIN
                }

                // Call Bitly api
                fetch(process.env.REACT_APP_BITLY_API_URL as string, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${process.env.REACT_APP_BITLY_TOKEN}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(content)
                })
                    .then(res => res.json())
                    .then(res => this.props.gotUrl(null, {longUrl: res.long_url, url: res.link}))
                    .catch(err => this.props.gotUrl(err.toString()))
            }
        }
    }


    render(): JSX.Element {
        return (
            <button className="btn btn-warning text-uppercase shorten-url" onClick={this.handleClick}>Shorten Url</button>
        )
    }
}
