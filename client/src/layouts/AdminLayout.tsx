import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import AdminSideNav from "./components/admin/AdminSideNav";
import { AdminHeader } from "./components/admin/AdminHeader";
import { AdminFooter } from "./components/admin/AdminFooter";

const { Sider } = Layout;

function AdminLayout() {
    let sidenavColor = "#1890ff";
    let sidenavType = "#fff";
    return (
        <Layout className="layout-dashboard">
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
                <AdminHeader />
                <Layout.Content className="content-ant">
                    <Outlet />
                </Layout.Content>
                <AdminFooter />
            </Layout>
        </Layout>
    );
}

export default AdminLayout;