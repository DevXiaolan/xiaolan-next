import ArticleStorage from '../libs/article/article';

const PAGE_SIZE = 10;

export const path = '/api/articles';

export default async (page: number = 1, keyword: string = '') => {
  if (keyword !== '') {
    return ArticleStorage.searchList(
      page,
      PAGE_SIZE,
      decodeURIComponent(keyword)
    );
  }
  return ArticleStorage.getList(page, PAGE_SIZE);
};