import './Profile.css';
import { Component, ReactNode } from "react";
import { Card, Col, Layout, Row } from 'antd';

export default class ProfilePage extends Component {
    render(): ReactNode {
        return (
            <Layout.Content className="p-5">
                <Row className="mb-24">
                    <Col span={24}>
                        <Card title="Basic Info">

                        </Card>
                    </Col>
                </Row>

                <Row className="mb-24">
                    <Col span={24}>
                        <Card title="Change password">

                        </Card>
                    </Col>
                </Row>


            </Layout.Content>
        );
    }
}