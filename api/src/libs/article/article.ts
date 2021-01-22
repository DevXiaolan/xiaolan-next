import { Dict } from '@mohism/utils';
import { readdirSync, readFileSync } from 'fs';

import { ArticleNotFound } from '../../errors';
import { Article } from './types';
import { join } from 'path';


class ArticleStorage {
  private loaded: boolean = false;
  list: Dict<Article> = {};
  ids: Array<number> = [];
  searchEngine: Dict<Array<Article>> = {};
  contents: Dict<string> = {};

  load() {
    if (this.loaded) {
      return;
    }
    this.loaded = true;
    const files: Array<string> = readdirSync(`${__dirname}/../json`).sort(
      (a, b) => {
        return (
          Number.parseInt(b.split('.')[0], 10) -
          Number.parseInt(a.split('.')[0], 10)
        );
      }
    );

    files.forEach((file) => {
      if (!file.endsWith('.json')) {
        return;
      }

      const {
        id,
        title,
        keywords: tags,
        createdAt: time,
        content,
        desc,
      } = require(join(__dirname, '../json', file));

      this.list[id] = {
        id: +id,
        title,
        tags,
        time: +time,
        desc,
      };
      this.contents[id] = content;
      this.ids.push(+id);
      (tags as Array<string>).forEach((tag: string) => {
        this.searchEngine[tag] = this.searchEngine[tag] || [];
        this.searchEngine[tag].push(this.list[id]);
      });
    });
    this.ids.sort((a: number, b: number): number => {
      return b - a;
    });
  }

  searchList(
    page: number = 1,
    size: number = 10,
    keyword: string = ''
  ): Array<Article> {
    if (
      !this.searchEngine[keyword] ||
      !Array.isArray(this.searchEngine[keyword])
    ) {
      return [];
    }
    const start: number = (page - 1) * size;
    const end: number = start + size;
    return this.searchEngine[keyword].slice(start, end);
  }

  getList(page: number = 1, size: number = 10): Array<Article> {
    const start: number = (page - 1) * size;
    const end: number = start + size;
    const ids: Array<number> = this.ids.slice(start, end);

    return ids.map((id: number) => this.list[id]);
  }

  getOne(id: number): Article {
    if (!this.list[id]) {
      throw ArticleNotFound;
    }
    return {
      ...this.list[id],
      content: this.contents[id],
    };
  }
}

const instance: ArticleStorage = new ArticleStorage();

instance.load();

export default instance;
