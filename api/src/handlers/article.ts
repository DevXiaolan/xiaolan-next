import ArticleStorage from '../libs/article/article';

export const path = '/api/article';

export default async (id: number = 0) => {
  return ArticleStorage.getOne(id);
};