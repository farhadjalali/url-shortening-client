import {Constants, ILink, AbTestVariant} from "../types";
import {gql, useMutation} from "@apollo/client";
import React from "react"

const SHORTEN_URL = gql`
    mutation ShortenUrl($longUrl: String!) {
        shortenUrl(longUrl: $longUrl){
            url
            longUrl
        }
    }
`
export function ShortenUrl(props: {
    longUrl: string,
    abTestVariant: AbTestVariant,
    gotUrl: (err?: string | null, link?: ILink) => void
}): JSX.Element {

    // Todo: check if this is the best place
    async function handleClick() {
        if (!Constants.URL_REGEX.test(props.longUrl)) {
            props.gotUrl("Please enter a valid url")
            return
        }

        switch (props.abTestVariant) {
            // Call Internal API
            case AbTestVariant.A: {
                // Todo: check useMutation problem
                const [callShortenUrl] = useMutation(SHORTEN_URL)
                // TODO: Complete error handling

                try {
                    const res = await callShortenUrl({
                            variables: {
                                longUrl: props.longUrl
                            }
                        }
                    )
                    props.gotUrl(null, res.data.shortenUrl)
                } catch (error) {
                    props.gotUrl(error ? error.toString() : null)
                }
                break
            }

            // Call Bitly API
            case AbTestVariant.B: {
                const content = {
                    long_url: props.longUrl,
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
                    .then(res => props.gotUrl(null, {longUrl: res.long_url, url: res.link}))
                    .catch(err => props.gotUrl(err.toString()))
            }
        }
    }

    return (
        <button className="btn btn-warning text-uppercase shorten-url" onClick={handleClick}>Shorten Url</button>
    )
}