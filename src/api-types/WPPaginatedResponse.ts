export type WPPaginatedResponse<T> = {
    data: T[],
    total: number,
    pages: number
};
