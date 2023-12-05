/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/addCommentForm';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'widgets/Page/Page';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';

import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations';
import { articleDetailsPageReducer } from '../../model/slices';
import {
    fetchArticlesRecommendations,
} from '../../model/services/fetchArticlesRecommendations/fetchArticlesRecommendations';
import {
    getArticleRecommendations,
} from '../../model/slices/ArticleDetailsPageRecommendationsSlice';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId }
    from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import styles from './ArticleDetailsPage.module.scss';
import { getArticleComments } from '../../model/slices/ArticleDetailsCommentSlice';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducerList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation('article');

    const { id } = useParams<{id: string}>();

    const comments = useSelector(getArticleComments.selectAll);

    const recommendations = useSelector(getArticleRecommendations.selectAll);

    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

    const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);

    const dispatch = useAppDispatch();

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text));
        },
        [dispatch],
    );

    const navigate = useNavigate();

    const onBackToList = useCallback(
        () => {
            navigate(RoutePath.articles);
        },
        [navigate],
    );

    useInitialEffect(() => {
        dispatch(fetchArticlesRecommendations());
        dispatch(fetchCommentsByArticleId(id));
    });

    if (!id) {
        return (
            <div className={classNames(styles.ArticleDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(styles.ArticleDetailsPage, {}, [className])}>
                <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>{t('Назад к списку')}</Button>
                <ArticleDetails id={id} />
                <Text className={styles.commenTitle} title={t('Рекомендуем статьи')} />
                <ArticleList
                    articles={recommendations}
                    isLoading={recommendationsIsLoading}
                    isShort
                    className={styles.recommendations}
                    target="_blank"
                />
                <Text className={styles.commenTitle} title={t('Комментарии')} />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </Page>
        </DynamicModuleLoader>

    );
};

export default memo(ArticleDetailsPage);
