/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { memo, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import EyeIcon from 'shared/assets/icons/eye-icon.svg';
import CalendarIcon from 'shared/assets/icons/calendar-icon.svg';
import { Error } from 'shared/ui/Error/Error';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { HStack, VStack } from 'shared/ui/Stack';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
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
                return <ArticleCodeBlockComponent block={block} key={block.id} />;
            case ArticleBlockType.IMAGE:
                return <ArticleImageBlockComponent block={block} key={block.id} />;
            case ArticleBlockType.TEXT:
                return <ArticleTextBlockComponent block={block} key={block.id} />;

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
            <VStack max align="start" gap="32">
                <div className={styles.ImageWrapper}>
                    <img src={data?.img} alt={data?.id} className={styles.image} width="100%" height={500} />
                </div>

                <Text title={data?.title} text={data?.subtitle} size={TextSize.L} />

                <VStack align="start" gap="16">
                    <HStack className={styles.info} gap="10">
                        <EyeIcon />
                        <Text text={String(data?.views)} />
                    </HStack>

                    <HStack className={styles.info} gap="10">
                        <CalendarIcon />
                        <Text text={data?.createdAt} />
                    </HStack>
                </VStack>

                {data?.blocks.map(renderBlock)}
            </VStack>

        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            {content}
        </DynamicModuleLoader>

    );
});
