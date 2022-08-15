import { Result } from "antd";
import { Link } from "react-router-dom";
import { authProvider } from "../api/AuthApi";

export function RequireAdmin({ children }: { children: JSX.Element }) {
    if (!authProvider.isAdmin()) {
        return <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Link to="/">Back Home</Link>}
        />
    }

    return children;
}
