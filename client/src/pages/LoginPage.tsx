import React, { FC, PropsWithChildren } from 'react';
import {
  Button, Card, Form, Input, Layout, Row, Typography,
} from 'antd';
import PageLayout from 'layout/PageLayout/PageLayout';

const { Content } = Layout;
const { Title } = Typography;

interface ILoginPage {
}

const LoginPage: FC<PropsWithChildren<ILoginPage>> = () => (
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
            name="login"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
            size="large"
          >
            <Row justify="center"><Title level={3}>Log in</Title></Row>
            <Form.Item
              label="E-mail"
              name="email"
              rules={[{ required: true, message: 'Please input your e-mail!' }]}
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
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">Log in</Button>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </Content>
  </PageLayout>
);

export default LoginPage;
