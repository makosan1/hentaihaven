import { APIVideo } from './api-types/APIVideo';
import { APITag } from './api-types/APITag';
import { HentaiHavenTag } from './HentaiHavenAPI';
import { decodeHTML } from 'entities';

export class HentaiHavenVideo {
    public tags: HentaiHavenTag[] = [];

    constructor(private data: APIVideo, tags: APITag[]) {
        this.tags = data.tags.map(id => tags.find(tag => tag.id == id)).filter(x => x);
    }

    public get id() {
        return this.data.id;
    }

    public get date_created() {
        return this.data.date;
    }

    public get date_modified() {
        return this.data.modified;
    }

    public get slug() {
        return this.data.slug;
    }

    public get link() {
        return this.data.link;
    }

    public get title() {
        return decodeHTML(this.data.title.rendered);
    }

    public get raw() {
        return this.data;
    }
}
