import globalStore from '@/store/global';
import { Col, Input, Row } from 'antd';
import React from 'react';

import styles from './styles.less';

const { Search } = Input;

interface IProps {
  hideSearch?: boolean;
  title?: string;
}

export default ({ hideSearch = false, title }: IProps) => {
  const { siteName } = globalStore.useState('siteName');
  return (
    <div className={styles.headline}>
      {!hideSearch
        ? (
          <Row justify="center" align="middle">
            <Col lg={12} md={12} sm={24} xs={24}>
              <h1>{siteName}</h1>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Search
                placeholder="输入标签名"
                onSearch={value => {
                  globalStore.setState({ keyword: value });
                }}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
        )
        : (
          <Row justify="center" align="middle">
            <Col lg={24} md={24} sm={24} xs={24}>
              <h1>{title}</h1>
            </Col>
          </Row>
        )}
    </div>
  );
};
