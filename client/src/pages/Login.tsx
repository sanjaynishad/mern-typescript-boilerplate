import './Login.css';
import { Component } from "react";
import { Link } from "react-router-dom";
import {
    Layout,
    Button,
    Row,
    Col,
    Typography,
    Form,
    Input,
} from "antd";
import signinbg from "../assets/images/img-signin.jpg";
const { Title } = Typography;
const { Content } = Layout;

export default class LoginPage extends Component {
    componentDidMount() {
        document.querySelector(".guest-layout")?.classList.add("layout-signin");
    }

    componentWillUnmount() {
        document.querySelector(".guest-layout")?.classList.remove("layout-signin");
    }

    render() {
        const onFinish = (values: any) => {
            console.log("Success:", values);
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log("Failed:", errorInfo);
        };

        return (
            <Content className="signin">
                <Row gutter={[24, 0]} justify="space-around">
                    <Col
                        xs={{ span: 24, offset: 0 }}
                        lg={{ span: 6, offset: 2 }}
                        md={{ span: 12 }}
                    >
                        <Title className="mb-15">Login</Title>
                        <Title className="font-regular text-muted" level={5}>
                            Enter your email and password to login
                        </Title>
                        <Form
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            layout="vertical"
                            className="row-col"
                        >
                            <Form.Item
                                className="username"
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your email!",
                                    },
                                ]}
                            >
                                <Input placeholder="Email" type="email" />
                            </Form.Item>

                            <Form.Item
                                className="username"
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password!",
                                    },
                                ]}
                            >
                                <Input placeholder="Password" type="password" />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ width: "100%" }}
                                >
                                    Log In
                                </Button>
                            </Form.Item>
                            <p className="font-semibold text-muted">
                                Don't have an account?{" "}
                                <Link to="/register" className="text-dark font-bold">
                                    Create new
                                </Link>
                            </p>
                        </Form>
                    </Col>
                    <Col
                        className="sign-img"
                        style={{ padding: 12 }}
                        xs={{ span: 24 }}
                        lg={{ span: 12 }}
                        md={{ span: 12 }}
                    >
                        <img src={signinbg} alt="" />
                    </Col>
                </Row>
            </Content>
        );
    }
}
