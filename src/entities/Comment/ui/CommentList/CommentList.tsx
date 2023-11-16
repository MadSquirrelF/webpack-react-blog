/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Comment } from '../../../Comment/model/types/comment';
import styles from './CommentList.module.scss';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
    const { isLoading, comments, className } = props;

    const { t } = useTranslation();

    return (
        <div className={classNames(styles.CommentList, {}, [className])}>
            {
                comments?.length
                    ? comments.map((comment) => (
                        <CommentCard isLoading={isLoading} className={styles.comment} comment={comment} />
                    ))
                    : (
                        <Text text={t('Комментарии отсутствуют')} />
                    )
            }
        </div>
    );
});
