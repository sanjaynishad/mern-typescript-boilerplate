import {
    Row,
    Col,
    Card,
    Button,
    Avatar,
    Typography,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { Component, ReactNode } from "react";
import { userApi } from "../api/UserApi";
import { User } from "../models";
import { EntityTable } from "./../components/EntityTable";

const { Title } = Typography;

const columns: ColumnsType<User> = [
    {
        title: "USER",
        dataIndex: "name",
        key: "name",
        width: "32%",
        render: (_, { firstName, lastName, email, avatar }) => {
            return <Avatar.Group>
                <Avatar
                    className="shape-avatar"
                    shape="square"
                    size={40}
                    src={avatar}
                ></Avatar>
                <div className="avatar-info">
                    <Title level={5}>{firstName} {lastName}</Title>
                    <p>{email}</p>
                </div>
            </Avatar.Group>;
        }
    },
    {
        title: "ROLE",
        dataIndex: "role",
        key: "role",
    },
    {
        title: "ACTION",
        render: () => {
            return <Button>Edit</Button>
        }
    }
];

interface IUsersPageState {
    users?: User[];
}

export default class UsersPage extends Component<any, IUsersPageState> {
    state: Readonly<IUsersPageState> = {};

    async componentDidMount() {
        const res = await userApi.getAllOrDefault();
        this.setState({
            users: res?.data || []
        });
    }

    render(): ReactNode {
        return (
            <Row gutter={[24, 0]} >
                <Col xs="24" xl={24}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title="Authors Table"
                    >
                        <div className="table-responsive">
                            <EntityTable
                                columns={columns}
                                dataSource={this.state.users}
                                pagination={false}
                                rowKey="_id"
                                className="ant-border-space"
                                loadEntities={async query => {
                                    return await userApi.getAllOrDefault(query);
                                }}
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
        );
    }
}
