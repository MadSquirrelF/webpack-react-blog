/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import style from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(style.Navbar, {}, [className])}>
            <div className={style.links}>
                <AppLink to="/" className={style.mainLink}>
                    {t('Главная')}
                </AppLink>
                <AppLink to="/about">{t('О сайте')}</AppLink>
            </div>
        </div>
    );
};
