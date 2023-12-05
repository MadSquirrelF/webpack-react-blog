import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';
import { ArticleOrder, ArticleSortField, ArticleType } from 'entities/Article/model/types/article';

export interface ArticlesPageSchema extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;

  // pagination

  page: number;
  limit: number;
  hasMore: boolean;

  // filters
  order: ArticleOrder;
  view: ArticleView;
  sort: ArticleSortField;
  search: string;
  type: ArticleType;

  _inited: boolean;
}
