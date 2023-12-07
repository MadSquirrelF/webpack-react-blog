/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { memo, useCallback, useState } from 'react';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AddIcon from 'shared/assets/icons/add-icon.svg';
import Logo from 'shared/assets/icons/logo.svg';
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
                <AppLink theme={AppLinkTheme.DEFAULT} className={styles.addArticleLink} to={RoutePath.articles_create}>
                    <AddIcon />
                    <span>{t('Добавить статью')}</span>
                </AppLink>
                <Button theme={ThemeButton.DECLINE} className={styles.linkLogout} onClick={onLogout} type="button">
                    {t('Выйти')}
                </Button>
            </header>
        );
    }

    return (
        <header className={classNames(styles.Navbar, {}, [className])}>
            <Button theme={ThemeButton.DEFAULT} className={styles.links} onClick={onShowModal} type="button">
                {t('Войти')}
            </Button>
            <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        </header>
    );
});
