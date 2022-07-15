import React, { FC, PropsWithChildren } from 'react';
import {
  Card, Row, Tag, Typography,
} from 'antd';

const { Title, Paragraph } = Typography;

interface IIssueCard {
  title: string,
  description: string,
}

const IssueCard: FC<PropsWithChildren<IIssueCard>> = ({ title, description }) => (
  <Card size="small">
    <Row>
      <Title level={5}>{title}</Title>
    </Row>
    <Paragraph>{description}</Paragraph>
    <Row>
      <Tag closable onClose={() => {}}>bug</Tag>
      <Tag closable onClose={() => {}}>critical</Tag>
    </Row>
  </Card>
);

export default IssueCard;
