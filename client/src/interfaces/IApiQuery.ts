export interface IApiQuery {
    page?: number | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    [customField: string]: any;
}
