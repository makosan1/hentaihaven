import { WPLinks } from './WPLinks';

export type APIVideo = {
    id: number,
    date: string,
    date_gmt: string,
    guid: {
        rendered: string
    },
    modified: string,
    modified_gmt: string,
    slug: string,
    status: 'publish' | 'future' | 'draft' | 'pending' | 'private',
    type: 'post',
    link: string,
    title: {
        rendered: string
    },
    content: {
        rendered: string,
        protected: boolean
    },
    excerpt: {
        rendered: string,
        protected: boolean
    },
    author: number,
    featured_media: number,
    comment_status: 'open' | 'closed',
    ping_status: 'open' | 'closed',
    sticky: boolean,
    template: string,
    format: string,
    meta: any[],
    categories: number[],
    tags: number[],
    _links: WPLinks<'author' | 'replies' | 'version-history' | 'wp:featuredmedia' | 'wp:attachment' | 'wp:term'>
};
