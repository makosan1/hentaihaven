import { APIOrder, APIOrderBy } from './APIOrdering';

export type APISearchRequest = Partial<{
    page: number,
    per_page: number,
    search: string,
    after: string | Date,
    before: string | Date,
    offset: number,
    order: APIOrder,
    orderby: APIOrderBy,
    slug: string,
    tax_relation: 'AND' | 'OR',
    categories: number[],
    categories_exclude: number[],
    tags: number[],
    tags_exclude: number[]
}>;
