/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { memo, useCallback, useState } from 'react';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import AddIcon from 'shared/assets/icons/add-icon.svg';
import Logo from 'shared/assets/icons/logo.svg';
import LogoutIcon from 'shared/assets/icons/logout-icon.svg';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { HStack } from 'shared/ui/Stack';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import ProfileIcon from 'shared/assets/icons/profile-icon.svg';
import styles from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();

    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();

    const [isAuthModal, setIsAuthModal] = useState(false);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (authData) {
        return (
            <header className={classNames(styles.Navbar, {}, [className])}>
                <Logo className={styles.logo} />
                <Dropdown
                    direction="bottom left"
                    className={styles.dropdown}
                    items={[
                        {
                            content: (
                                <HStack max justify="start" gap="10">
                                    <ProfileIcon />
                                    <span>{t('Настройки пользователя')}</span>
                                </HStack>
                            ),
                            href: RoutePath.profile + authData.id,
                        },
                        {
                            content: (
                                <HStack max justify="start" gap="10">
                                    <AddIcon />
                                    <span>{t('Добавить статью')}</span>
                                </HStack>
                            ),
                            href: RoutePath.articles_create,
                        },
                        {
                            content: (
                                <HStack max justify="start" gap="10">
                                    <LogoutIcon />
                                    <span>{t('Выйти')}</span>
                                </HStack>

                            ),
                            onClick: onLogout,
                        },
                    ]}
                    trigger={<Avatar size={50} className={styles.avatar} src={authData.avatar} />}
                />
            </header>
        );
    }

    return (
        <header className={classNames(styles.Navbar, {}, [className])}>
            <Logo className={styles.logo} />
            <Button theme={ThemeButton.DEFAULT} className={styles.links} onClick={onShowModal} type="button">
                {t('Войти')}
            </Button>
            <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        </header>
    );
});
