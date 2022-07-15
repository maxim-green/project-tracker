import React, { FC, PropsWithChildren } from 'react';
import Sidebar from 'components/Sidebar/Sidebar';
import { Layout } from 'antd';
import Board from 'components/Board/Board';
import PageLayout from 'layout/PageLayout/PageLayout';

const { Content } = Layout;

interface IBoardPage {
}

const ProjectPage: FC<PropsWithChildren<IBoardPage>> = () => (
  <PageLayout>
    <Sidebar />
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
      }}
    >
      <Board />
    </Content>
  </PageLayout>
);

export default ProjectPage;
