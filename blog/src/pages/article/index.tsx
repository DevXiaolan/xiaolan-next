import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';
import { Spin, Tag } from 'antd';
import Header from '@/components/header';
import { ApiOutlined } from '@ant-design/icons';
import { getArticle, IArticle } from '@/services/api';
import MarkdownView from 'react-showdown';
import { tagColor } from '@/utils/func';
import dayjs from 'dayjs';

import styles from './styles.less';

interface IParam {
  id?: string | undefined;
}

export default () => {
  const { id = 0 } = useParams<IParam>();
  const [loading, toggleLoading] = useState<boolean>(true);

  const [article, setArticle] = useState<IArticle>();

  useEffect(() => {
    getArticle(+id).then(data => {
      setTimeout(() => {
        setArticle(data);
        toggleLoading(false);
      }, 2000)
    });
  }, [id]);

  if (loading) {
    return (
      <Spin
        indicator={
          <ApiOutlined
            style={{ fontSize: 72, marginTop: 64 }} 
            spin
          />
        }
      />
    );
  }

  const { time, tags, content, title } = article as IArticle;

  return (
    <div className={styles.article}>
      <Header title={article?.title} hideSearch={true} />
      <p>
        <span>{dayjs(time * 1000).format('MMMM DD, YYYY')}</span>
        {tags.map((tag: string) => {
          return (
            <Tag
              key={tag}
              style={{ backgroundColor: "#272B35" }}
              color={tagColor(tag)}
            >
              {tag}
            </Tag>
          )
        })}
      </p>
      <div className={styles.content}>
        <MarkdownView
          dangerouslySetInnerHTML={true}
          markdown={content || ''}
          options={{ tables: true, emoji: true }}
        />
      </div>
    </div>
  );
};