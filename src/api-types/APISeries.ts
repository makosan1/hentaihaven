import { WPLinks } from './WPLinks';

export type APISeries = {
    id: number,
    count: number,
    description: string,
    link: string,
    name: string,
    slug: string,
    taxonomy: 'category',
    parent: number,
    meta: any[],
    _links: WPLinks<'wp:post_type'>
};
