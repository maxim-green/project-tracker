import React, { FC, PropsWithChildren } from 'react';
import {
  Button, Card, Col, Space, Typography,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import IssueCard from 'components/IssueCard/IssueCard';

const { Title } = Typography;

interface IStatusColumn {
  title: string,
}

const StatusColumn: FC<PropsWithChildren<IStatusColumn>> = ({ title }) => (
  <Col style={{ width: 320 }}>
    <Card
      title={<Title level={4}>{title}</Title>}
      extra={(
        <PlusOutlined
          onClick={() => {
          }}
        />
)}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button block size="large">New issue</Button>
        <IssueCard title="Title" description="Description" />
        <IssueCard title="Title" description="Description" />
        <IssueCard title="Title" description="Description" />
      </Space>
    </Card>
  </Col>
);

export default StatusColumn;
