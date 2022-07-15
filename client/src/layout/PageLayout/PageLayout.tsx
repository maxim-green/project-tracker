import React, { FC, PropsWithChildren } from 'react';
import { Layout } from 'antd';
import classes from './PageLayout.module.scss';

interface IPageLayout {
}

const PageLayout: FC<PropsWithChildren<IPageLayout>> = ({ children }) => (
  <Layout className={classes.pageLayout}>
    {children}
  </Layout>
);

export default PageLayout;
