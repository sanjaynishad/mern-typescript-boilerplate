import { Skeleton } from "antd";
import { Component, ReactNode } from "react";

export class PageLoader extends Component {
    render(): ReactNode {
        return (
            <div>
                <Skeleton active />
                <Skeleton active />
            </div>
        );
    }
}
