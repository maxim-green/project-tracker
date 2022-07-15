import React, { FC, PropsWithChildren } from 'react';
import {
  Layout, Menu, Row, Avatar, Space,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import classes from './AppLayout.module.scss';

const { Header, Content } = Layout;

interface IAppLayout {
}

const AppLayout: FC<PropsWithChildren<IAppLayout>> = ({ children }) => {
  const auth = true;
  let menuItems;
  if (auth) {
    menuItems = [{ key: '1', label: 'Log out' }];
  }
  if (!auth) {
    menuItems = [{ key: '1', label: <NavLink to="/login">Log in</NavLink> }, {
      key: '2',
      label: <NavLink to="/registration">Sign in</NavLink>,
    }];
  }
  return (
    <Layout>
      <Header>
        <NavLink to="/">
          <div className={classes.logo} />
        </NavLink>
        <Row justify="end" align="middle">
          <Space>
            <Menu
              theme="dark"
              mode="horizontal"
              selectable={false}
              items={menuItems}
            />
            {auth && (
              <NavLink to="/profile">
                <Avatar icon={<UserOutlined />} />
              </NavLink>
            )}
          </Space>
        </Row>
      </Header>
      <Content>
        {children}
      </Content>
    </Layout>
  );
};

export default AppLayout;
