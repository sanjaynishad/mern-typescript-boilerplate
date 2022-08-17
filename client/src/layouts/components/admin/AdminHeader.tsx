import { Link } from "react-router-dom";
import {
    Button,
    Col,
    Layout,
    Row
} from "antd";
import { ProfilePopover } from "../ProfilePopover";
import { HomeFilled } from "@ant-design/icons";
const { Header } = Layout;

const toggler = [
    <svg
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        key={0}
    >
        <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
    </svg>,
];

interface IAdminHeaderProps {
    onPress: () => void;
}

export function AdminHeader({ onPress }: IAdminHeaderProps) {
    return (
        <Header>
            <Row>
                <Col span={24} md={6}>
                    {/* TODO: add breadcrunb and move toggler in another col */}
                    <Button
                        type="link"
                        className="sidebar-toggler"
                        onClick={() => onPress()}
                    >
                        {toggler}
                    </Button>
                </Col>
                <Col span={24} md={18} className="header-control">
                    <ProfilePopover className="ms-1" />
                    <Link to="/" className="text-dark goto-app-home">
                        <HomeFilled />
                        <span> Exit to application</span>
                    </Link>
                </Col>
            </Row>
        </Header>
    );
}