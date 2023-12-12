/* eslint-disable i18next/no-literal-string */
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import EditIcon from 'shared/assets/icons/edit-icon.svg';
import { getUserAuthData } from 'entities/User';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails';
import { HStack } from 'shared/ui/Stack';
import { getCanEditArticle } from '../../model/selectors/article';
import styles from './ArticleDetailsPageHeader.module.scss';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(({ className }: ArticleDetailsPageHeaderProps) => {
    const { t } = useTranslation('article');

    const canEdit = useSelector(getCanEditArticle);

    const article = useSelector(getArticleDetailsData);

    const navigate = useNavigate();

    const onBackToList = useCallback(
        () => {
            navigate(RoutePath.articles);
        },
        [navigate],
    );

    const onEditArticle = useCallback(
        () => {
            navigate(`${RoutePath.articles_details}${article?.id}/edit`);
        },
        [article?.id, navigate],
    );

    return (
        <HStack max justify="between" gap="10" className={classNames(styles.ArticleDetailsPageHeader, {}, [className])}>
            <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>{t('Назад к списку')}</Button>

            {
                canEdit && (
                    <Button theme={ThemeButton.DEFAULT} onClick={onEditArticle} className={styles.editBtn}>
                        <EditIcon />
                    </Button>
                )
            }

        </HStack>
    );
});
