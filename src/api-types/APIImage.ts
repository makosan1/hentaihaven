import { WPLinks } from './WPLinks';

export type APIImage = {
    id: number,
    date: string,
    date_gmt: string,
    guid: {
        rendered: string
    },
    modified: string,
    modified_gmt: string,
    slug: string,
    status: 'publish' | 'future' | 'draft' | 'pending' | 'private' | 'inherit',
    type: 'attachment',
    link: string,
    title: {
        rendered: string
    },
    author: number,
    comment_status: 'open' | 'closed',
    ping_status: 'open' | 'closed',
    template: string,
    meta: any[],
    description: {
        rendered: string
    },
    caption: {
        rendered: string
    },
    alt_text: string,
    media_type: string,
    mime_type: string,
    media_details: {
        width: number,
        height: number,
        file: string,
        sizes: {
            [T in 
                'thumbnail' |
                'medium' |
                'medium_large' |
                'large' |
                'thumb-single' |
                'thumb-single-full' |
                'thumb-brick-big' |
                'thumb-brick-medium' |
                'thumb-brick-small' |
                'full'
            ]: {
                file: string,
                width: number,
                height: number,
                mime_type: string,
                source_url: string
            }
        },
        image_meta: any
    },
    post: number,
    source_urL: string,
    _links: WPLinks<'author' | 'replies'>
};
