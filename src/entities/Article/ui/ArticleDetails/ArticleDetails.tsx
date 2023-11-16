/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { memo, useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticleById } from 'entities/Article/model/services/fetchArticleById/fetchArticleById';
import { useSelector } from 'react-redux';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from 'entities/Article/model/selectors/articleDetails';
import EyeIcon from 'shared/assets/icons/eye-icon.svg';
import CalendarIcon from 'shared/assets/icons/calendar-icon.svg';
import { Error } from 'shared/ui/Error/Error';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import styles from './ArticleDetails.module.scss';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

const reducers: ReducerList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const isLoading = useSelector(getArticleDetailsIsLoading);
    const data = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);

    const renderBlock = useCallback(
        (block: ArticleBlock) => {
            switch (block.type) {
            case ArticleBlockType.CODE:
                return <ArticleCodeBlockComponent className={styles.block} block={block} key={block.id} />;
            case ArticleBlockType.IMAGE:
                return <ArticleImageBlockComponent className={styles.block} block={block} key={block.id} />;

            case ArticleBlockType.TEXT:
                return <ArticleTextBlockComponent className={styles.block} block={block} key={block.id} />;

            default:
                return null;
            }
        },
        [],
    );

    useInitialEffect(() => dispatch(fetchArticleById(id)));

    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton width={200} height={200} border="50%" className={styles.avatar} />
                <Skeleton width={300} height={32} border="10px" className={styles.title} />
                <Skeleton width={600} height={24} border="10px" className={styles.skeleton} />
                <Skeleton width="100%" height={200} border="10px" className={styles.skeleton} />
                <Skeleton width="100%" height={200} border="10px" className={styles.skeleton} />
            </>
        );
    } else if (error) {
        content = (
            <Error error="Произошла ошибка при загрузке статьи" />
        );
    } else {
        content = (
            <>
                <div className={styles.avatarWrapper}>
                    <Avatar size={200} src={data?.img} className={styles.avatar} />
                </div>

                <Text className={styles.title} title={data?.title} text={data?.subtitle} size={TextSize.L} />
                <div className={styles.info}>
                    <EyeIcon />
                    <Text text={String(data?.views)} />
                </div>

                <div className={styles.info}>
                    <CalendarIcon />
                    <Text text={data?.createdAt} />
                </div>
                {data?.blocks.map(renderBlock)}
            </>

        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(styles.ArticleDetails, {}, [className])}>
                {content}
            </div>
        </DynamicModuleLoader>

    );
});
