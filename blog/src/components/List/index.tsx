import React, { useEffect, useState } from 'react';

import styles from './styles.less';
import globalStore from '@/store/global';
import { IArticle, getArticles } from '@/services/api';
import { Button } from 'antd';
import Card from '@/components/Card';

const PAGE_SIZE = 10;

export default () => {
  const { keyword } = globalStore.useState('keyword');
  const [page, setPage] = useState<number>(1);
  const [list, setList] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // 当keyword变化时，先清空列表
  useEffect(() => {
    setPage(1);
    setList([]);
  }, [keyword]);

  useEffect(() => {
    setLoading(true);
    getArticles(keyword, page)
      .then((data: IArticle[]) => {
        setLoading(false);
        if (data.length < PAGE_SIZE) {
          setHasMore(false);
        }
        setList((prevState: IArticle[]): IArticle[] => {
          return [...prevState, ...data];
        });
      })
      .catch((e: Error) => {
        console.log(e);
        setLoading(false);
      });
  }, [page, keyword]);

  return (
    <div className={styles.content}>
      {
        list.map((article: IArticle) => {
          return (
            <Card {...article} key={article.id} />
          )
        })
      }
      {hasMore && (
        <Button
          ghost
          block
          onClick={() => { setPage(page + 1); }}
          loading={loading}
        >
          继续阅读...
        </Button>)}
    </div>
  );
};