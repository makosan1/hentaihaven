import { WPLinks } from './WPLinks';

export type APITag = {
    id: number,
    count: number,
    description: string,
    link: string,
    name: string,
    slug: string,
    taxonomy: string,
    meta: any[],
    _links: WPLinks<'wp:post_type'>
};
