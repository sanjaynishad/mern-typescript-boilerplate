import './Register.css';
import { Component } from "react";
import {
    Layout,
    Button,
    Typography,
    Card,
    Form,
    Input,
    Checkbox,
} from "antd";

import { Link } from "react-router-dom";
import {
    GithubOutlined,
    FacebookFilled,
    GoogleOutlined
} from "@ant-design/icons";

const { Title } = Typography;
const { Content } = Layout;

export default class RegisterPage extends Component {
    componentDidMount() {
        document.querySelector(".guest-layout")?.classList.add("layout-sign-up");
    }

    componentWillUnmount() {
        document.querySelector(".guest-layout")?.classList.remove("layout-sign-up");
    }

    render() {
        const onFinish = (values: any) => {
            console.log("Success:", values);
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log("Failed:", errorInfo);
        };
        return (
            <>
                <Content className="p-0">
                    <div className="sign-up-header">
                        <div className="content">
                            <Title>Register</Title>
                            <p className="text-lg">
                                Use these awesome forms to create an account.
                            </p>
                        </div>
                    </div>

                    <Card
                        className="card-signup header-solid h-full ant-card pt-0"
                        title={<h5>Register With</h5>}
                        bordered={false}
                    >
                        <div className="sign-up-gateways">
                            <Button type="default">
                                {<FacebookFilled />}
                                {/* <img src={logo1} alt="logo 1" /> */}
                            </Button>
                            <Button type="default">
                                {<GoogleOutlined />}
                                {/* <img src={logo2} alt="logo 2" /> */}
                            </Button>
                            <Button type="default">
                                {<GithubOutlined />}
                                {/* <img src={logo3} alt="logo 3" /> */}
                            </Button>
                        </div>
                        <p className="text-center my-25 font-semibold text-muted">Or</p>
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            className="row-col"
                        >
                            <Form.Item
                                name="firstName"
                                rules={[
                                    { required: true, message: "Please input your First name!" },
                                ]}
                            >
                                <Input placeholder="First name" />
                            </Form.Item>

                            <Form.Item
                                name="lastName"
                                rules={[
                                    { required: true, message: "Please input your Last name!" },
                                ]}
                            >
                                <Input placeholder="Last name" />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: "Please input your email!" },
                                ]}
                            >
                                <Input placeholder="Email" type="email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    { required: true, message: "Please input your password!" },
                                ]}
                            >
                                <Input placeholder="Passwoed" type="password" />
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>
                                    I agree the{" "}
                                    <a href="#pablo" className="font-bold text-dark">
                                        Terms and Conditions
                                    </a>
                                </Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    style={{ width: "100%" }}
                                    type="primary"
                                    htmlType="submit"
                                >
                                    SIGN UP
                                </Button>
                            </Form.Item>
                        </Form>
                        <p className="font-semibold text-muted text-center">
                            Already have an account?{" "}
                            <Link to="/login" className="font-bold text-dark">
                                Log In
                            </Link>
                        </p>
                    </Card>
                </Content>
            </>
        );
    }
}
