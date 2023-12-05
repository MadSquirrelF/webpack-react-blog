/* eslint-disable i18next/no-literal-string */
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import NoDataImage from 'shared/assets/images/no-data.jpg';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { SizeButton } from 'shared/ui/Button/Button';
import { Article, ArticleView } from '../../model/types/article';
import styles from './ArticleList.module.scss';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  isShort?: boolean;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SHORT ? 3 : 1)
    .fill(0)
    .map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ArticleListItemSkeleton className={styles.card} key={index} view={view} />
    ));

export const ArticleList = memo((props: ArticleListProps) => {
    const { t } = useTranslation('article');

    const {
        className, articles, target, isLoading, isShort, view = ArticleView.SHORT,
    } = props;

    const renderArticle = (article: Article) => (
        <ArticleListItem
            article={article}
            view={view}
            className={styles.card}
            key={article.id}
            isShort={isShort}
            target={target}
        />
    );

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(styles.ArticlesNotFound, {}, [className])}>
                <div className={styles.ImageWrapper}>
                    <img
                        src={NoDataImage}
                        alt="Изображение файлы не найдены"
                        height={500}
                        width={500}
                        className={styles.NoDataImage}
                    />
                </div>
                <div className={styles.content}>
                    <Text title={t('Статьи не найдены')} size={TextSize.L} />
                    <Text
                        text={t('Уууупс... Информация сейчас не доступна, попробуйте поискать что-то еще')}
                        size={TextSize.S}
                    />
                </div>

            </div>
        );
    }

    return (
        <div className={classNames(styles.ArticleList, {}, [className])}>
            {articles.length > 0 ? articles.map(renderArticle) : null}
            {isLoading && getSkeletons(view)}
        </div>
    );
});
