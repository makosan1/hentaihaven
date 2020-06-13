export type WPLinks<T extends string> = {
    [K in T | 'self' | 'collection' | 'about']: {
        href: string,
        embeddable?: boolean,
        taxonomy?: string
    }[]
} & {
    curies: {
        name: string,
        href: string,
        templated: boolean
    }[]
};
