/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';

import { Card } from 'shared/ui/Card/Card';

import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import styles from './ArticleListItem.module.scss';
import {
    ArticleView,
} from '../../model/types/article';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo(({ className, view }: ArticleListItemSkeletonProps) => {
    const { t } = useTranslation('article');

    if (view === ArticleView.FULL) {
        return (
            <div className={classNames(styles.ArticleListItem, {}, [className, styles[view]])}>
                <Card className={styles.card}>
                    <div className={styles.header}>
                        <div className={styles.headerTop}>
                            <div className={styles.avatarWrapper}>
                                <Skeleton
                                    width={40}
                                    height={40}
                                    border="50%"
                                    className={styles.avatar}
                                />
                                <Skeleton
                                    width={70}
                                    height={20}
                                    border="10px"
                                    className={styles.username}
                                />

                            </div>
                            <Skeleton
                                width={100}
                                height={30}
                                border="10px"
                                className={styles.createdAt}
                            />
                        </div>

                        <div className={styles.alignWrapper}>
                            <Skeleton width="100%" height={40} className={styles.title} border="10px" />
                            <div className={styles.typeWrapper}>
                                <Skeleton width={100} height={30} className={styles.type} />
                                <Skeleton width={100} height={30} className={styles.type} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.imageWrapper}>
                        <Skeleton width="100%" height={300} className={styles.img} />
                    </div>

                    <div className={styles.infoWrapper}>
                        <div className={styles.alignWrapper}>
                            <Skeleton width="100%" height={210} className={styles.textBlock} border="10px" />
                        </div>

                        <div className={styles.statWrapper}>
                            <Skeleton width={100} height={30} className={styles.createdAt} border="10px" />
                            <div className={styles.viewsWrapper}>
                                <Skeleton width={50} height={30} className={styles.svgSkeleton} border="10px" />
                            </div>
                        </div>

                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className={classNames(styles.ArticleListItem, {}, [className, styles[view]])}>
            <Card className={styles.card}>
                <div className={styles.imageWrapper}>
                    <Skeleton width="100%" height={180} className={styles.img} />
                </div>
                <div className={styles.infoWrapper}>
                    <div className={styles.alignWrapper}>
                        <Skeleton width="100%" height={40} className={styles.title} border="10px" />
                        <div className={styles.typeWrapper}>
                            <Skeleton width={100} height={30} className={styles.type} />
                            <Skeleton width={100} height={30} className={styles.type} />
                        </div>
                        <Skeleton width="100%" height={150} className={styles.subtitle} border="10px" />
                    </div>

                    <div className={styles.statWrapper}>
                        <Skeleton width={100} height={30} className={styles.createdAt} border="10px" />
                        <div className={styles.viewsWrapper}>
                            <Skeleton width={50} height={30} className={styles.svgSkeleton} border="10px" />
                        </div>
                    </div>

                </div>
            </Card>
        </div>
    );
});
