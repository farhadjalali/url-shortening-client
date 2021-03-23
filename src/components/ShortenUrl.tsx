import {Constants, ILink, AbTestVariant} from "../types";
import {gql, useMutation} from "@apollo/client";
import React from "react";

export default function ShortenUrl(props: {
    longUrl: string,
    abTestVariant: AbTestVariant,
    gotUrl: (err?: string | null, link?: ILink) => void
}): JSX.Element {

    const [callShortenUrl] = useMutation(gql`
        mutation ShortenUrl($longUrl: String!) {
            shortenUrl(longUrl: $longUrl){
                url
                longUrl
            }
        }
    `)

    return (
        <button className="btn btn-warning text-uppercase" onClick={async () => {
            if (!Constants.urlRegex.test(props.longUrl)) {
                props.gotUrl("Please enter a valid url")
                return
            }

            switch (props.abTestVariant) {
                // Call Internal API
                case AbTestVariant.A: {
                    const res = await callShortenUrl({variables: {longUrl: props.longUrl}})
                    props.gotUrl(null, res.data.shortenUrl)
                    break
                }

                // Call Bitly API
                case AbTestVariant.B: {
                    const content = {
                        long_url: props.longUrl,
                        domain: Constants.BITLY_DOMAIN
                    }

                    // Call Bitly api
                    fetch(Constants.BITLY_API_URL, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${Constants.BITLY_TOKEN}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(content)
                    })
                        .then(res => res.json())
                        .then(res => props.gotUrl(null, {longUrl: res.long_url, url: res.link}))
                        .catch(err => props.gotUrl(err.toString()))
                }
            }
        }}>Shorten Url</button>
    )
}
