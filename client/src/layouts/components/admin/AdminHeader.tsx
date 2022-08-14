import { Link } from "react-router-dom";
import {
    Layout,
    Menu
} from "antd";
import { profile, template } from "../../../app-icons";
const { Header } = Layout;

export function AdminHeader() {
    return (
        <Header>
            <div className="header-col header-nav">
                <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
                    <Menu.Item key="1">
                        <Link to="/">
                            {template}
                            <span> Exit to application</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="dashboard">
                            {template}
                            <span> Dashboard</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="users">
                            {template}
                            <span> Users</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/profile">
                            {profile}
                            <span>Profile</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        </Header>
    );
}