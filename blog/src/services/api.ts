import request from '@/utils/request';

export type IArticle = {
  id: number,
  title: string,
  time: number,
  tags: Array<string>,
  desc: string,
  content?: string,
};

export const getArticles = async (keyword: string = '', page: number = 1): Promise<IArticle[]> => {
  const { data } = await request(`/articles`, {
    method: 'GET',
    params: {
      keyword,
      page,
    },
  });
  return data;
};

export const getArticle = async (id: number): Promise<IArticle> => {
  const { data } = await request(`/article`, {
    method: 'GET',
    params: {
      id,
    },
  });
  return data;
};
