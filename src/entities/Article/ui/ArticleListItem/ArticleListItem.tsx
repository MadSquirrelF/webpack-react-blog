/* eslint-disable i18next/no-literal-string */
import { HTMLAttributeAnchorTarget, HTMLAttributes, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import EyeIcon from 'shared/assets/icons/eye-icon.svg';
import { Card } from 'shared/ui/Card/Card';

import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import styles from './ArticleListItem.module.scss';
import {
    Article, ArticleBlockType, ArticleTextBlock, ArticleView,
} from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  isShort?: boolean;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo(({
    className, article, view, isShort, target,
}: ArticleListItemProps) => {
    const { t } = useTranslation('article');

    const types = (
        <div className={styles.typeWrapper}>
            {
                article.type.map((item) => (
                    <div className={styles.type} key={item}>
                        {item}
                    </div>
                ))
            }
        </div>
    );

    const image = (
        <div className={styles.imageWrapper}>
            <img src={article.img} alt={article.subtitle} title={article.title} className={styles.img} />
        </div>
    );

    const views = (
        <div className={styles.viewsWrapper}>
            <EyeIcon />
            <span className={styles.views}>{article.views}</span>
        </div>
    );

    if (view === ArticleView.FULL) {
        const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
        return (
            <div className={classNames(styles.ArticleListItem, {}, [className, styles[view]])}>
                <Card className={styles.card}>
                    <div className={styles.header}>
                        <div className={styles.headerTop}>
                            <div className={styles.avatarWrapper}>
                                <Avatar
                                    src={article.user.avatar}
                                    alt={article.user.id}
                                    size={40}
                                    className={styles.avatar}
                                />
                                <span className={styles.username}>
                                    {article.user.username}
                                </span>
                            </div>
                            <Text title={article.createdAt} className={styles.createdAt} size={TextSize.XS} />
                        </div>

                        <div className={styles.alignWrapper}>
                            <Text title={article.title} className={styles.title} size={TextSize.M} />
                            {types}
                        </div>
                    </div>

                    {image}

                    <div className={styles.infoWrapper}>
                        <div className={styles.alignWrapper}>
                            {textBlock && (
                                <ArticleTextBlockComponent block={textBlock} className={styles.textBlock} />
                            )}
                        </div>

                        <div className={styles.statWrapper}>
                            <AppLink target={target} to={RoutePath.articles_details + article.id}>
                                <Button theme={ThemeButton.DEFAULT}>{t('Читать далее...')}</Button>
                            </AppLink>

                            {views}
                        </div>

                    </div>
                </Card>
            </div>
        );
    }

    return (
        <AppLink
            target={target}
            to={RoutePath.articles_details + article.id}
            className={classNames(styles.ArticleListItem, {}, [className, styles[view]])}
        >
            <Card className={classNames(styles.card, { [styles.short]: isShort })}>
                <div className={styles.imageWrapper}>
                    <img src={article.img} alt={article.subtitle} title={article.title} className={styles.img} />
                </div>
                {
                    isShort ? (
                        <div className={styles.infoWrapper}>
                            <div className={styles.alignWrapper}>
                                <Text title={article.title} className={styles.title} size={TextSize.XS} />
                            </div>
                        </div>
                    ) : (
                        <div className={styles.infoWrapper}>
                            <div className={styles.alignWrapper}>
                                <Text title={article.title} className={styles.title} size={TextSize.XS} />

                                {types}
                                <Text text={article.subtitle} className={styles.subtitle} size={TextSize.XS} />
                            </div>

                            <div className={styles.statWrapper}>
                                <Text title={article.createdAt} className={styles.createdAt} size={TextSize.XS} />
                                {views}
                            </div>

                        </div>
                    )
                }

            </Card>
        </AppLink>
    );
});
