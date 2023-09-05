/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import styles from './LoginForm.module.scss';

interface LoginFormProps {
 className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(styles.LoginForm, {}, [className])}>
            <h2 className={styles.title}>{t('Авторизация')}</h2>
            <Input
                autofocus
                label={t('Логин')}
                placeholder={t('Введите логин')}
                type="text"
            />
            <Input
                label={t('Пароль')}
                placeholder={t('Введите пароль')}
                isPassword
                type="password"
                className={styles.password}
            />
            <Button className={styles.loginBtn} theme={ThemeButton.DEFAULT}>
                {t('Войти')}
            </Button>
        </div>
    );
};
