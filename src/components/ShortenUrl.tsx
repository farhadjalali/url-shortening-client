import {Constants, ILink, AbTestVariant} from "../types";
import {gql, useMutation} from "@apollo/client";
import React from "react";

export default function ShortenUrl(props: {
    longUrl: string,
    abTestVariant: AbTestVariant,
    gotUrl: (err?: string | null, link?: ILink) => void
}): JSX.Element {

    // Graphql Mutation
    const [callShortenUrl] = useMutation(gql`
        mutation ShortenUrl($longUrl: String!) {
            shortenUrl(longUrl: $longUrl){
                url
                longUrl
            }
        }
    `)

    return (
        <button className="btn btn-warning text-uppercase shorten-url" onClick={async () => {
            if (!Constants.URL_REGEX.test(props.longUrl)) {
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
                        domain: process.env.BITLY_DOMAIN
                    }

                    // Call Bitly api
                    fetch(process.env.BITLY_API_URL as string, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${process.env.BITLY_TOKEN}`,
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
