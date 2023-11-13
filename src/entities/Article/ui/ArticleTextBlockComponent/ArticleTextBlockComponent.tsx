/* eslint-disable react/no-array-index-key */
/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { ArticleTextBlock } from '../../../Article/model/types/article';
import styles from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock
}

export const ArticleTextBlockComponent = memo(({ className, block }: ArticleTextBlockComponentProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(styles.ArticleTextBlockComponent, {}, [className])}>
            {
                block.title && (
                    <Text title={block.title} className={styles.title} />
                )
            }
            {
                block.paragraphs.map((paragraph) => (
                    <Text key={paragraph} text={paragraph} className={styles.paragraph} />
                ))
            }
        </div>
    );
});
