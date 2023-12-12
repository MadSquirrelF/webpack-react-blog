import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import {
    getProfileData, getProfileReadonly, profileActions, updateProfileData,
} from 'entities/Profile';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from 'entities/User';
import ProfileIcon from 'shared/assets/icons/profile-icon.svg';
import { VStack } from 'shared/ui/Stack/VStack/VStack';
import { HStack } from 'shared/ui/Stack/HStack/HStack';
import styles from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
    const { t } = useTranslation('profile');

    const readonly = useSelector(getProfileReadonly);

    const dispatch = useAppDispatch();

    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);

    const canEdit = authData?.id === profileData?.id;

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSaveEdit = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return (
        <HStack max justify="between" className={classNames(styles.ProfilePageHeader, {}, [className])}>
            <HStack gap="10" className={styles.titleWrapper}>
                <ProfileIcon />
                <Text title={t('Настройки профиля')} />
            </HStack>

            {canEdit && (
                <HStack className={styles.btnWrapper}>
                    {readonly ? (
                        <Button theme={ThemeButton.DEFAULT} className={styles.editBtn} onClick={onEdit}>
                            {t('Редактировать')}
                        </Button>
                    ) : (
                        <HStack gap="10" className={styles.btnContainer}>
                            <Button theme={ThemeButton.DECLINE} className={styles.cancelBtn} onClick={onCancelEdit}>
                                {t('Отменить')}
                            </Button>
                            <Button theme={ThemeButton.DEFAULT} className={styles.saveBtn} onClick={onSaveEdit}>
                                {t('Сохранить')}
                            </Button>
                        </HStack>

                    )}
                </HStack>
            )}

        </HStack>
    );
};
