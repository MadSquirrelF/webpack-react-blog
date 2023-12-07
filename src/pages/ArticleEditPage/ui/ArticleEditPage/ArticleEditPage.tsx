/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { useParams } from 'react-router-dom';
import { Text, TextSize } from 'shared/ui/Text/Text';
import styles from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = memo(({ className }: ArticleEditPageProps) => {
    const { t } = useTranslation('article');

    const { id } = useParams<{id: string}>();

    const isEdit = Boolean(id);

    return (
        <Page className={classNames(styles.ArticleEditPage, {}, [className])}>
            {isEdit
                ? (<Text size={TextSize.L} title={t('Редактирование статьи')} />)
                : (<Text size={TextSize.L} title={t('Создание статьи')} />)}
        </Page>
    );
});

export default ArticleEditPage;
