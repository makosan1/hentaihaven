import { WPPaginatedResponse } from './api-types/WPPaginatedResponse';
import { APIVideo } from './api-types/APIVideo';
import { APITag } from './api-types/APITag';
import { HentaiHavenVideo } from './HentaiHavenVideo';

export class HentaiHavenSearch {
    public results: HentaiHavenVideo[];

    constructor(private data: WPPaginatedResponse<APIVideo>, tags: APITag[]) {
        this.results = data.data.map(video => new HentaiHavenVideo(video, tags));
    }

    public get pages() {
        return this.data.pages;
    }

    public get total() {
        return this.data.total;
    }

    public get raw() {
        return this.data;
    }
}
