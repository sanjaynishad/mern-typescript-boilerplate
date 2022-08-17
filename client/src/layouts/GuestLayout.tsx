import './GuestLayout.css';

import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { GuestFooter } from "./components/guest/GuestFooter";
import { GuestHeader } from "./components/guest/GuestHeader";

function GuestLayout() {
    return (
        <Layout className="layout-default guest-layout">
            <GuestHeader />
            <Outlet />
            <GuestFooter />
        </Layout>
    );
}

export default GuestLayout;