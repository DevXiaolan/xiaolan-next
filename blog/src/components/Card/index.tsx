import { IArticle } from '@/services/api';
import { tagColor } from '@/utils/func';
import { Tag } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'umi';

import styles from './styles.less';

interface IProps extends IArticle {
  key: string | number;
}

export default (props: IProps) => {
  const { title, time, tags, desc, id } = props;
  return (
    <div className={styles.card} key={id}>
      <h3>
        <Link
          to={`/${id}`}
        >
          {title}
        </Link>
      </h3>
      <p>
        <span>{dayjs(time * 1000).format('MMMM DD, YYYY')}</span>
        {tags.map((tag) => {
          return (
            <Tag
              key={tag}
              style={{ backgroundColor: "#272B35" }}
              color={tagColor(tag)}
            >{tag}</Tag>
          )
        })}
      </p>
      <p className={styles.desc}>
        {desc}
      </p>
    </div>
  );
};