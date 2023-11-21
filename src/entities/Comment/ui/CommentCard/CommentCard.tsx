/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text, TextSize } from 'shared/ui/Text/Text';
import defaultAvatar from 'shared/assets/images/defaultAvatar.jpg';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Comment } from '../../../Comment/model/types/comment';
import styles from './CommentCard.module.scss';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { t } = useTranslation();
    const { className, isLoading, comment } = props;

    if (isLoading) {
        return (
            <div className={classNames(styles.CommentCard, {}, [className, styles.loading])}>
                <div className={styles.header}>
                    <Skeleton width={30} height={30} border="50%" className={styles.avatar} />
                    <Skeleton width={100} height={16} border="10px" />
                </div>

                <Skeleton width="100%" height={30} border="10px" />

            </div>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <div className={classNames(styles.CommentCard, {}, [className])}>
            <AppLink to={`${RoutePath.profile}${comment.user.id}`} className={styles.header}>
                {
                    comment.user.avatar
                        ? (<Avatar size={30} className={styles.avatar} src={comment.user.avatar} />)
                        : (
                            <Avatar size={30} className={styles.avatar} src={defaultAvatar} />
                        )
                }
                <Text className={styles.username} title={comment.user.username} size={TextSize.S} />
            </AppLink>
            <Text className={styles.text} text={comment.text} size={TextSize.S} />
        </div>
    );
});
