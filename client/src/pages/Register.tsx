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
    notification,
} from "antd";

import { Link, Navigate } from "react-router-dom";
import {
    GithubOutlined,
    FacebookFilled,
    GoogleOutlined
} from "@ant-design/icons";
import { authProvider } from '../api/AuthApi';
import { IUser } from '../interfaces/models';

const { Title } = Typography;
const { Content } = Layout;

interface IRegisterState {
    user: IUser;
    acceptedTerms: boolean;
}

export default class RegisterPage extends Component<any, IRegisterState> {
    constructor(props: any) {
        super(props);
        this.state = {
            acceptedTerms: true,
            user: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        document.querySelector(".guest-layout")?.classList.add("layout-sign-up");
    }

    componentWillUnmount() {
        document.querySelector(".guest-layout")?.classList.remove("layout-sign-up");
    }

    async onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const { firstName, lastName, email, password } = this.state.user;
        if (!(firstName && lastName && email && password)) {
            alert('All fields are required!');
            return;
        }

        if (!this.state.acceptedTerms) {
            notification.warn({
                message: "You must agree to the terms and conditions."
            });

            return;
        }

        const data = await authProvider.register(this.state.user);
        if (data?.error) {
            notification.error({
                message: data.error?.message || 'Something is wrong!'
            });
        }

        if (data?.message) {
            notification.info({
                message: data.message || 'Registered successfully!'
            });

            window.location.href = '/login';
        }
    }

    render() {
        const onFinish = (values: any) => {
            console.log("Success:", values);
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log("Failed:", errorInfo);
        };

        if (authProvider.isLoggedIn()) {
            return (
                <Navigate to="/dashbaord" replace />
            )
        }

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
                            onSubmitCapture={this.onSubmit}
                            className="row-col"
                        >
                            <Form.Item
                                name="firstName"
                                rules={[
                                    { required: true, message: "Please input your First name!" },
                                ]}
                            >
                                <Input
                                    autoFocus
                                    placeholder="First name"
                                    value={this.state.user.firstName}
                                    onChange={e => this.setState({ user: { ...this.state.user, firstName: e.target.value } })} />
                            </Form.Item>

                            <Form.Item
                                name="lastName"
                                rules={[
                                    { required: true, message: "Please input your Last name!" },
                                ]}
                            >
                                <Input
                                    placeholder="Last name"
                                    value={this.state.user.lastName}
                                    onChange={e => this.setState({ user: { ...this.state.user, lastName: e.target.value } })} />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: "Please input your email!" },
                                ]}
                            >
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    value={this.state.user.email}
                                    onChange={e => this.setState({ user: { ...this.state.user, email: e.target.value } })} />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    { required: true, message: "Please input your password!" },
                                ]}
                            >
                                <Input
                                    placeholder="Password"
                                    type="password"
                                    value={this.state.user.password}
                                    onChange={e => this.setState({ user: { ...this.state.user, password: e.target.value } })} />
                            </Form.Item>

                            <Form.Item
                                name="remember"
                                rules={[{
                                    required: true,
                                    message: "You must agree to the terms and conditions."
                                }]}>
                                <Checkbox
                                    checked={this.state.acceptedTerms}
                                    onChange={e => this.setState({ acceptedTerms: e.target.checked })} >
                                    I agree the{" "}
                                    <Link to="/terms" className="font-bold text-dark">
                                        Terms and Conditions
                                    </Link>
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
