import { CreditCardFilled, DashboardFilled, ProfileFilled, TeamOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";

function AdminSideNav({ color }: any) {
    const { pathname } = useLocation();
    const page = pathname.replace("/", "");

    return (
        <>
            <div className="brand">
                <NavLink to="">
                    <span className="text-dark">Your Brand</span>
                </NavLink>
            </div>
            <hr />
            <Menu theme="light" mode="inline">
                <Menu.Item key="1">
                    <NavLink to="dashboard">
                        <span
                            className="icon"
                            style={{
                                background: page === "dashboard" ? color : "",
                            }}
                        >
                            <DashboardFilled />
                        </span>
                        <span className="label">Dashboard</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                    <NavLink to="users">
                        <span
                            className="icon"
                            style={{
                                background: page === "tables" ? color : "",
                            }}
                        >
                            <TeamOutlined />
                        </span>
                        <span className="label">Users</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                    <NavLink to="billing">
                        <span
                            className="icon"
                            style={{
                                background: page === "billing" ? color : "",
                            }}
                        >
                            <CreditCardFilled />
                        </span>
                        <span className="label">Billing</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item className="menu-item-header" key="5">
                    Account Pages
                </Menu.Item>
                <Menu.Item key="6">
                    <NavLink to="profile">
                        <span
                            className="icon"
                            style={{
                                background: page === "profile" ? color : "",
                            }}
                        >
                            <ProfileFilled />
                        </span>
                        <span className="label">Profile</span>
                    </NavLink>
                </Menu.Item>
            </Menu>
        </>
    );
}

export default AdminSideNav;