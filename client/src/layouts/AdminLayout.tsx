import './AdminLayout.css';
import { Outlet, useLocation } from "react-router-dom";
import { Drawer, Layout } from "antd";
import AdminSideNav from "./components/admin/AdminSideNav";
import { AdminHeader } from "./components/admin/AdminHeader";
import { AdminFooter } from "./components/admin/AdminFooter";
import { useState } from "react";

const { Sider } = Layout;

function AdminLayout() {
    let sidenavColor = "#1890ff";
    let sidenavType = "#fff";
    let placement = "right";

    const [visible, setVisible] = useState(false);
    const openDrawer = () => setVisible(!visible);

    let { pathname } = useLocation();
    pathname = pathname.replace("/", "");

    return (
        <Layout className="layout-dashboard">
            <Drawer
                title={false}
                placement={placement === "right" ? "left" : "right"}
                closable={false}
                onClose={() => setVisible(false)}
                visible={visible}
                key={placement === "right" ? "left" : "right"}
                width={250}
                className={`drawer-sidebar ${pathname === "rtl" ? "drawer-sidebar-rtl" : ""
                    } `}
            >
                <Layout
                    className={`layout-dashboard ${pathname === "rtl" ? "layout-dashboard-rtl" : ""
                        }`}
                >
                    <Sider
                        trigger={null}
                        width={250}
                        theme="light"
                        className={`sider-primary ant-layout-sider-primary ${sidenavType === "#fff" ? "active-route" : ""
                            }`}
                        style={{ background: sidenavType }}
                    >
                        <AdminSideNav color={sidenavColor} />
                    </Sider>
                </Layout>
            </Drawer>

            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                trigger={null}
                width={250}
                theme="light"
                className={`sider-primary ant-layout-sider-primary ${sidenavType === "#fff" ? "active-route" : ""}`}
                style={{ background: sidenavType }}
            >
                <AdminSideNav color={sidenavColor} />
            </Sider>
            <Layout>
                <AdminHeader onPress={openDrawer} />
                <Layout.Content className="content-ant">
                    <Outlet />
                </Layout.Content>
                <AdminFooter />
            </Layout>
        </Layout>
    );
}

export default AdminLayout;