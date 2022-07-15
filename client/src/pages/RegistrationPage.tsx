import React, { FC, PropsWithChildren } from 'react';
import {
  Form, Input, Row, Layout, Card, Button, Typography,
} from 'antd';
import PageLayout from 'layout/PageLayout/PageLayout';

const { Content } = Layout;
const { Title } = Typography;

interface IRegistrationPage {
}

const RegistrationPage: FC<PropsWithChildren<IRegistrationPage>> = () => (
  <PageLayout>
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
      }}
    >
      <Row justify="center">
        <Card>
          <Form
            name="registration"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
            size="large"
          >
            <Row justify="center"><Title level={3}>Sign in</Title></Row>
            <Form.Item
              label="E-mail"
              name="email"
              rules={[{ required: true, message: 'Please input your e-mail!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="First name"
              name="firstName"
              rules={[{
                required: true,
                message: 'Please input your first name!',
              }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last name"
              name="lastName"
              rules={[{
                required: true,
                message: 'Please input your first name!',
              }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Repeat password"
              name="repeat-password"
              rules={[{
                required: true,
                message: 'Please repeat your password!',
              }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">Sign in</Button>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </Content>
  </PageLayout>
);

export default RegistrationPage;
