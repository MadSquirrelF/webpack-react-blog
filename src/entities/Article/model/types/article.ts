import { User } from 'entities/User';

export enum ArticleSortField {
  VIEWS = 'views',
  TITLE = 'title',
  CREATED = 'createdAt'
}

export enum ArticleOrder {
  DESC = 'desc',
  ASC = 'asc'
}

export enum ArticleBlockType {
  CODE = 'CODE',
  IMAGE = 'IMAGE',
  TEXT = 'TEXT'
}

export enum ArticleView {
  FULL = 'FULL',
  SHORT = 'SHORT'
}

export interface ArticleBlockBase {
  id: string
  type: ArticleBlockType;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
  type: ArticleBlockType.CODE
  code: string;
}

export interface ArticleImageBlock extends ArticleBlockBase {
  type: ArticleBlockType.IMAGE
  src: string
  title: string
}

export interface ArticleTextBlock extends ArticleBlockBase {
  type: ArticleBlockType.TEXT
  title?: string
  paragraphs: string[]
}

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock

export enum ArticleType {
  ALL = 'All',
  IT = 'IT',
  FRONTEND = 'Frontend',
  JAVASCRIPT = 'JavaScript',
  WEBDESIGN = 'Web Design',
  TEST = 'Tests',
  DEVOPS = 'DevOps',
  BIGDATA = 'Big Data',
  DATAENGINEERING = 'Data Engineering'
}

export interface Article {
  id: string
  title: string
  subtitle: string
  img: string
  views: number
  user: User
  createdAt: string
  type: ArticleType[]
  blocks: ArticleBlock[];
}
