import React from 'react';
import styles from './styles.less';

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.App}>
      {children}
    </div>
  );
};
