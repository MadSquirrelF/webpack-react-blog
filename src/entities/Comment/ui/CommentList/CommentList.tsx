/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { Comment } from '../../../Comment/model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
    const { isLoading, comments, className } = props;

    const { t } = useTranslation();

    if (isLoading) {
        return (
            <VStack gap="16" max align="start" className={classNames('', {}, [className])}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </VStack>
        );
    }

    return (
        <VStack max align="start" gap="16" className={classNames('', {}, [className])}>
            {
                comments?.length
                    ? comments.map((comment, index) => (
                        <CommentCard
                            isLoading={isLoading}
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            comment={comment}
                        />
                    ))
                    : (
                        <Text text={t('Комментарии отсутствуют')} />
                    )
            }
        </VStack>
    );
});
