import React, { FC, PropsWithChildren } from 'react';
import { Row, Space } from 'antd';
import StatusColumn from 'components/StatusColumn/StatusColumn';

interface IBoard {
}

const Board: FC<PropsWithChildren<IBoard>> = () => (
  <Row justify="center">
    <Space align="start">
      <StatusColumn title="To do" />
      <StatusColumn title="In progress" />
    </Space>
  </Row>
);

export default Board;
