export interface ILink {
    longUrl: string,
    url: string
}

export const Constants = {
    urlRegex: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/,

    BITLY_TOKEN: `c9967322faa8e8d1177ab198f37d9cc518581cd2`,
    BITLY_API_URL: 'https://api-ssl.bitly.com/v4/shorten',
    BITLY_DOMAIN: 'bit.ly'
}

export enum AbTestVariant {
    B,
    A,
}