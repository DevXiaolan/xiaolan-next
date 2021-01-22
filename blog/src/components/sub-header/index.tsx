import React from "react";
import { Row, Col } from 'antd';

import logo from './logo.png';
import styles from './styles.less';
import globalStore from '@/store/global';

export default () => {
  const {
    keyword,
    github,
    author,
  } = globalStore.useState('author', 'keyword', 'github');
  return (
    <Row justify="center">
      <Col lg={3} md={6} sm={6} xs={6}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
      </Col>
      <Col lg={21} md={18} sm={18} xs={16}>
        <p className={styles.slogan}>
          <a href={github} >{author}</a> 个人博客
            {keyword && (
            `  , 与 "${keyword}" 相关的内容:`
          )}
        </p>
      </Col>
    </Row>
  );
}