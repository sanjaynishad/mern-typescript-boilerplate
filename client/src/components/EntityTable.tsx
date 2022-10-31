import React, { Component, ReactNode } from "react";
import { Table } from "antd";
import { TablePaginationConfig, TableProps } from "antd/es/table";
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";

import { IApiQuery } from "../interfaces/IApiQuery";
import { IApiResponse } from "../interfaces/IApiResponse";

interface IEntityTableProps<T> extends TableProps<T> {
    loadEntities: (query?: Record<string, any>) => Promise<IApiResponse>;
    tablePaginationConfig?: TablePaginationConfig;
    showSrCol?: boolean;
}

interface IEntityTableState<T> {
    data: T[];
    loading: boolean;
    pagination?: TablePaginationConfig;
    query?: Record<string, any>;
}

export class EntityTable<T extends object> extends Component<IEntityTableProps<T>, IEntityTableState<T>> {
    constructor(props: IEntityTableProps<T>) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            pagination: {
                current: 1,
                pageSize: 10,
                position: props.tablePaginationConfig?.position || ['bottomRight'],
                hideOnSinglePage: true,
                showTotal(total, range) {
                    return <>Total - <strong>{total}</strong></>;
                },
            }
        };

        this.loadData = this.loadData.bind(this);
        this.onTableChange = this.onTableChange.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    refreshTable() {
        this.loadData(this.state.query);
    }

    private async loadData(query?: Record<string, any>) {
        this.setState({
            loading: true
        });

        const res = await this.props.loadEntities(query);
        const meta = res.meta;

        this.setState({
            loading: false
        });

        if (!res?.data || !meta) {
            return
        }

        const pagination: TablePaginationConfig = {
            ...this.state.pagination,
            current: meta.page,
            total: meta.totalDocs,
            pageSize: meta.limit,
        };
        this.setState({
            data: res.data,
            pagination: pagination
        });
    }

    private onTableChange(
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<any> | SorterResult<any>[],
        extra: TableCurrentDataSource<any>) {

        const query: IApiQuery = {
            limit: pagination.pageSize,
            page: pagination.current
        };

        if (filters) {
            for (const key in filters) {
                if (filters[key]) {
                    query[key] = filters[key]
                }
            }
        }

        if (sorter) {
            const s = sorter as SorterResult<any>;
            query.sortField = s.field;
            query.sortOrder = s.order;
        }

        this.loadData(query);
        this.setState({
            query
        });
    }

    render(): ReactNode {
        let { columns, showSrCol } = this.props;
        const page = this.state.pagination?.current || 1;
        const pageSize = this.state.pagination?.pageSize || 10;
        if (columns?.length && showSrCol) {
            columns = [{
                title: 'Sr',
                key: 'index',
                render(value, record, index) {
                    return ((page) - 1) * pageSize + index + 1;
                },
            }, ...columns]
        }

        return <Table
            columns={columns}
            rowKey={this.props.rowKey || "_id"}
            dataSource={this.state.data}
            loading={this.state.loading}
            pagination={this.state.pagination}
            onChange={this.onTableChange}
        />
    }
}
