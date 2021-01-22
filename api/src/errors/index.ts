import { HTTP_STATUS, MohismError } from '@mohism/core';

const { NotFound } = HTTP_STATUS;

export const ArticleNotFound: MohismError = new MohismError('article not found')
  .setStatus(NotFound)
  .setSeq(1);
