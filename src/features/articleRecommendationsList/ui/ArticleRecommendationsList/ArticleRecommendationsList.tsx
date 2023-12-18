/* eslint-disable i18next/no-literal-string */
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleList } from 'entities/Article';
import { Text } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const { isLoading, data: articles, error } = useArticleRecommendationsList(3);

    if (isLoading || error) {
        return null;
    }

    return (
        <VStack align="start" gap="32" className={classNames('', {}, [className])}>
            <Text title={t('Рекомендуем статьи')} />
            <ArticleList
                articles={articles}
                isLoading={isLoading}
                isShort
                target="_blank"
            />
        </VStack>
    );
});
