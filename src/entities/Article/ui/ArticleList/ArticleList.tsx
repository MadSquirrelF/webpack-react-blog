/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Article, ArticleView } from '../../model/types/article';
import styles from './ArticleList.module.scss';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView
}

export const ArticleList = memo((props: ArticleListProps) => {
    const { t } = useTranslation();

    const {
        className, articles, isLoading, view = ArticleView.SHORT,
    } = props;

    if (isLoading) {
        return (
            <div className={classNames(styles.ArticleList, {}, [className])}>
                {
                    new Array(view === ArticleView.SHORT ? 9 : 3).fill(0).map((item, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <ArticleListItemSkeleton view={view} key={index} />
                    ))
                }
            </div>
        );
    }

    return (
        <div className={classNames(styles.ArticleList, {}, [className])}>
            {articles.length > 0 ? articles.map((item) => (
                <ArticleListItem article={item} view={view} key={item.id} />
            )) : null}
        </div>
    );
});
