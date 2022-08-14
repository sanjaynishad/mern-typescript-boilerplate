import { Link } from "react-router-dom";
import {
    Layout,
    Menu
} from "antd";
import {
    TwitterOutlined,
    InstagramOutlined,
    GithubOutlined,
    FacebookOutlined,
} from "@ant-design/icons";
import { CopyrightComponent } from "./Copyright";

const { Footer } = Layout;

export function MainFooter() {
    return (
        <Footer>
            <Menu mode="horizontal">
                <Menu.Item>Company</Menu.Item>
                <Menu.Item>About Us</Menu.Item>
                <Menu.Item>Teams</Menu.Item>
                <Menu.Item>Products</Menu.Item>
                <Menu.Item>Blogs</Menu.Item>
                <Menu.Item>Pricing</Menu.Item>
            </Menu>
            <Menu mode="horizontal" className="menu-nav-social">
                <Menu.Item>
                    <Link to="#">{<TwitterOutlined />}</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="#">{<FacebookOutlined />}</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="#">{<InstagramOutlined />}</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="#">{<GithubOutlined />}</Link>
                </Menu.Item>
            </Menu>
            <CopyrightComponent />
        </Footer>
    )
}