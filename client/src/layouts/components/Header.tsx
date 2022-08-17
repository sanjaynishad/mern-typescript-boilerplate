import { Component } from "react";
import { Link } from "react-router-dom";
import {
    Layout,
    Menu
} from "antd";
import { DashboardOutlined, DesktopOutlined, HomeOutlined, ProfileOutlined } from "@ant-design/icons";
import { authProvider } from "../../api/AuthApi";
import { User, Role } from "../../models";
import { ProfilePopover } from "./ProfilePopover";
const { Header } = Layout;

interface IMainHeaderState {
    me: User;
}
export class MainHeader extends Component<any, IMainHeaderState> {

    constructor(props: any) {
        super(props);

        this.state = {
            me: {}
        }
    }

    async componentDidMount() {
        this.setState({
            me: await authProvider.me() || {}
        });
    }

    render() {
        const { role } = this.state.me;
        return (
            <>
                <Header>
                    <div className="header-col header-brand">
                        <Link to="/">
                            <h5>Your Brand</h5>
                        </Link>
                    </div>
                    <div className="header-col header-nav">
                        <Menu mode="horizontal" defaultSelectedKeys={["dashboard"]}>
                            {role === Role.Admin && (<Menu.Item key="admin">
                                <Link to="/admin">
                                    <DesktopOutlined />
                                    <span> Admin Portal</span>
                                </Link>
                            </Menu.Item>)}
                            <Menu.Item key="home">
                                <Link to="/">
                                    <HomeOutlined />
                                    <span> Home</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="dashboard">
                                <Link to="/dashboard">
                                    <DashboardOutlined />
                                    <span> Dashboard</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="profile">
                                <Link to="/profile">
                                    <ProfileOutlined />
                                    <span>Profile</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div>
                        <ProfilePopover />
                    </div>

                </Header>
            </>
        );
    }
}