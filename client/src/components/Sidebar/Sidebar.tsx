import React, { FC, PropsWithChildren, useState } from 'react';
import {
  Layout, Menu, MenuProps, Row,
} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  ProjectOutlined,
} from '@ant-design/icons';
import classes from 'layout/AppLayout.module.scss';
import { NavLink } from 'react-router-dom';

const { Sider } = Layout;

interface ISidebar {
}

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  title?: string,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    title,
  } as MenuItem;
}

const Sidebar: FC<PropsWithChildren<ISidebar>> = () => {
  const [collapsed, setCollapsed] = useState(false);

  const projects = [
    {
      id: '1',
      title: 'Project 1',
    },
    {
      id: '2',
      title: 'Project 2',
      icon: true,
    },
    {
      id: '3',
      title: 'Project 3',
    },
  ];

  const items: MenuItem[] = [
    ...projects.map(
      (project) => getItem(
        collapsed
          ? (
            <NavLink to={`/project/${project.id}`}>
              <Row
                justify="center"
              >
                {project.title[0]}
              </Row>
            </NavLink>
          )
          : <NavLink to={`/project/${project.id}`}>{project.title}</NavLink>,
        project.id,
        project.icon ? <ProjectOutlined /> : undefined,
        project.title,
        undefined,
      ),
    ),
    getItem('New project', 'new-project', <PlusOutlined />),
  ];

  return (
    <Sider
      theme="light"
      trigger={null}
      collapsedWidth={48}
      collapsible
      collapsed={collapsed}
    >
      <Menu selectable={false}>
        <Row justify={collapsed ? 'center' : 'end'} style={{ padding: '16px' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: classes.trigger,
            onClick: () => setCollapsed(!collapsed),
          })}
        </Row>
      </Menu>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
