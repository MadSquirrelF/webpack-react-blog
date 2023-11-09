/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import styles from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation('article');
    return (
        <div className={classNames(styles.ArticleDetailsPage, {}, [className])}>
            ArticleDetailsPage
        </div>
    );
};

export default memo(ArticleDetailsPage);
