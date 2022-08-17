import { Result } from "antd";
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { authProvider } from "../api/AuthApi";
import { Role, User } from "../models";
import { PageLoader } from "./PageLoader";

interface IRequireAdminState {
    me?: User;
}

export class RequireAdmin extends Component<any, IRequireAdminState> {
    state: Readonly<IRequireAdminState> = {};

    async componentDidMount() {
        this.setState({
            me: await authProvider.me(),
        });
    }

    render(): ReactNode {
        if (authProvider.isLoggedIn() && !this.state.me) {
            return <PageLoader />
        }

        if (this.state.me?.role === Role.Admin) {
            return this.props.children;
        }

        return <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Link to="/">Back Home</Link>}
        />
    }
}
