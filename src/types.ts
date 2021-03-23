// The result type of
export interface ILink {
    longUrl: string,
    url: string
}

export const Constants = {
    URL_REGEX: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/,
}

export enum AbTestVariant {
    B,
    A,
}