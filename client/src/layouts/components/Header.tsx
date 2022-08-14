import { Component } from "react";
import { Link } from "react-router-dom";
import {
    Layout,
    Menu
} from "antd";
import { profile, signin, signup, template } from "../../app-icons";
import { DesktopOutlined } from "@ant-design/icons";
const { Header } = Layout;
export class MainHeader extends Component {
    render() {
        return (
            <>
                <Header>
                    <div className="header-col header-brand">
                        <Link to="/">
                            <h5>Your Brand</h5>
                        </Link>
                    </div>
                    <div className="header-col header-nav">
                        <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
                            <Menu.Item key="0">
                                <Link to="/admin">
                                    <DesktopOutlined />
                                    <span> Admin Portal</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="1">
                                <Link to="/dashboard">
                                    {template}
                                    <span> Dashboard</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/profile">
                                    {profile}
                                    <span>Profile</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/register">
                                    {signup}
                                    <span> Sign Up</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to="/login">
                                    {signin}
                                    <span> Log In</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </Header>
            </>
        );
    }
}