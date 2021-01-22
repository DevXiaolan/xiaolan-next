export type Article = {
  id: number;
  time: number;
  title: string;
  tags: Array<string>;
  content?: string;
  desc?: string;
};
