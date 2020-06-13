import node_fetch, { RequestInit } from 'node-fetch';
import { WPPaginatedResponse } from './api-types/WPPaginatedResponse';
import { APITag } from './api-types/APITag';
import AbortController from 'abort-controller';
import { APIVideo } from './api-types/APIVideo';
import { HentaiHavenVideo } from './HentaiHavenVideo';
import { APISeries } from './api-types/APISeries';
import { APIImage } from './api-types/APIImage';

const fetch: typeof node_fetch = async (...args) => {
    const response = await node_fetch(...args);

    response.json = async () => JSON.parse((await response.text()).replace(/\n+/g, ' '));

    return response;
};

fetch.isRedirect = node_fetch.isRedirect;

export type HentaiHavenOptions = {
    fetch_options?: RequestInit,
    timeout?: number
};

export type HentaiHavenTag = {
    id: number,
    count: number,
    description: string,
    link: string,
    name: string,
    slug: string
};

export type HentaiHavenSeries = {
    id: string,
    count: number,
    description: string,
    link: string,
    name: string,
    slug: string
};

export class HentaiHavenAPI {
    private static tags: Promise<APITag[]>;

    public static async get_tags(include_unused: boolean = false) {
        if (include_unused) return this.tags;

        return (await this.tags).filter(({ count }) => count);
    }

    constructor(private options?: HentaiHavenOptions) {
        this.options = Object.assign({}, {
            fetch_options: {},
            timeout: 5000
        }, options);

        if (HentaiHavenAPI.tags) return;

        HentaiHavenAPI.tags = this.api_fetch<WPPaginatedResponse<APITag>>('https://hentaihaven.org/wp-json/wp/v2/tags?per_page=100').then(async response => {
            if ('error' in response) return [];
        
            const tag_pages = new Array(response.pages - 1).map(async page => {
                const response = await this.api_fetch<WPPaginatedResponse<APITag>>(`https://hentaihaven.org/wp-json/wp/v2/tags?per_page=100&page=${page + 2}`)

                if ('error' in response) return [];

                return response.data;
            });
        
            return [...response.data, ...(await Promise.all(tag_pages)).flat(Infinity)];
        });
    }

    private get_fetch_options(options: RequestInit): RequestInit {
        return Object.assign({},
            this.options.fetch_options,
            options,
            {
                headers: Object.assign({},
                    this.options.fetch_options?.headers ?? {},
                    options.headers ?? {}
                )
            }
        );
    }

    public async get_video(id: string | number) {
        let video: APIVideo;

        if (Number.isNaN(+id)) {
            const response = await this.api_fetch<WPPaginatedResponse<APIVideo>>(`https://hentaihaven.org/wp-json/wp/v2/posts/?slug=${encodeURIComponent(id)}`);

            if ('error' in response || !response.data.length) return null;

            video = response.data[0];
        } else {
            const response = await this.api_fetch<APIVideo>(`https://hentaihaven.org/wp-json/wp/v2/posts/${id}`);

            if ('error' in response) return null;

            video = response;
        }

        return new HentaiHavenVideo(video, await HentaiHavenAPI.get_tags());
    }

    public async get_video_series(video: string | number | HentaiHavenVideo): Promise<Omit<APISeries, '_links'>> {
        if (video instanceof HentaiHavenVideo) video = video.id;

        const response = await this.api_fetch<WPPaginatedResponse<APISeries>>(`http://hentaihaven.org/wp-json/wp/v2/categories?post=${video}`);

        if ('error' in response) return null;

        const { _links, ...data } = response.data[0]; 

        return data;
    }

    public async get_video_image(video: string | number | HentaiHavenVideo): Promise<Omit<APIImage, '_links'>> {
        if (video instanceof HentaiHavenVideo) video = video.raw.featured_media;

        const response = await this.api_fetch<APIImage>(`http://hentaihaven.org/wp-json/wp/v2/media/${video}`);

        if ('error' in response) return null;

        const { _links, ...data } = response;

        return data;
    }

    private async api_fetch<T>(url: string, options?: RequestInit): Promise<T | {
        error: true,
        code: string,
        message: string,
    }> {
        const controller = new AbortController();

        const timeout = setTimeout(() => controller.abort(), this.options.timeout);

        const result = await fetch(url, this.get_fetch_options({ ...options, signal: controller.signal }));

        clearTimeout(timeout);

        const json = await result.json();

        if (result.status >= 300) return {
            error: true,
            ...json
        };

        if (Array.isArray(json)) return {
            data: json,
            total: result.headers.get('x-wp-total'),
            pages: result.headers.get('x-wp-totalpages')
        } as any;

        return json;
    }
}
