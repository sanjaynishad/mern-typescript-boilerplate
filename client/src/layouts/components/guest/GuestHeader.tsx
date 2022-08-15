import { Component } from "react";
import { Link } from "react-router-dom";
import {
    Layout,
    Menu
} from "antd";
import { profile, signin, signup, template } from "../../../app-icons";
const { Header } = Layout;
export class GuestHeader extends Component {
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
                        <Menu mode="horizontal" defaultSelectedKeys={["home"]}>
                            <Menu.Item key="home">
                                <Link to="/">
                                    {template}
                                    <span> Home</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="about-us">
                                <Link to="/about-us">
                                    {profile}
                                    <span> About Us</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="register">
                                <Link to="/register">
                                    {signup}
                                    <span> Sign Up</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="login">
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