import React, { FC, PropsWithChildren, useState } from 'react';
import { Layout, Menu, Row } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import classes from './AppLayout.module.scss';

const { Header, Sider, Content } = Layout;

interface IAppLayout {
}

const AppLayout: FC<PropsWithChildren<IAppLayout>> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Header>
        <div className={classes.logo} />
        <Row justify="end">
          <Menu
            theme="dark"
            mode="horizontal"
            selectable={false}
            items={[{ key: '1', label: 'Log out' }]}
          />
        </Row>
      </Header>
      <Content>
        <Layout className={classes.main}>
          <Sider
            theme="light"
            trigger={null}
            collapsedWidth={48}
            collapsible
            collapsed={collapsed}
          >
            <Menu>
              <Row justify="end">
                <Menu.Item style={{ background: 'transparent' }}>
                  {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => setCollapsed(!collapsed),
                  })}
                </Menu.Item>
              </Row>
            </Menu>
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={['1']}
              items={[
                {
                  key: '1',
                  label: 'Project 1',
                },
                {
                  key: '2',
                  label: 'App 2',
                },
                {
                  key: '3',
                  label: 'Hello world',
                },
              ]}
            />
          </Sider>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default AppLayout;
