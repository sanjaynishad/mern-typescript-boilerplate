export interface IApiResponseMeta {
    totalDocs: number;
    limit: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    page?: number | undefined;
    totalPages: number;
    offset: number;
    prevPage?: number | null | undefined;
    nextPage?: number | null | undefined;
    pagingCounter: number;
    [customLabel: string]: any;
}

export interface IApiResponse {
    data?: any;
    meta?: IApiResponseMeta;

    message?: string;

    error?: {
        code?: number;
        message?: string;
    };
}
