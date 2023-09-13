/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { loginActions } from 'features/AuthByUsername/model/slice/loginSlice';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { Error } from 'shared/ui/Error/Error';
import { Loader, ThemeLoader } from 'shared/ui/Loader/Loader';
import { getLoginState } from '../../model/selectors/getLoginState/selectLoginState';
import styles from './LoginForm.module.scss';

interface LoginFormProps {
 className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const {
        username, password, error, isLoading,
    } = useSelector(getLoginState);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }));
    }, [dispatch, password, username]);

    return (
        <div className={classNames(styles.LoginForm, {}, [className])}>
            <h2 className={styles.title}>{t('Авторизация')}</h2>
            <Input
                autofocus
                label={t('Логин')}
                placeholder={t('Введите логин')}
                type="text"
                onChange={onChangeUsername}
                value={username}
            />
            <Input
                label={t('Пароль')}
                placeholder={t('Введите пароль')}
                isPassword
                type="password"
                className={styles.password}
                onChange={onChangePassword}
                value={password}
            />
            <Button disabled={isLoading} className={styles.loginBtn} theme={ThemeButton.DEFAULT} onClick={onLoginClick}>
                {
                    isLoading ? <Loader theme={ThemeLoader.BTN_LOADER} /> : <span>{t('Войти')}</span>
                }
            </Button>

            {
                error && (
                    <Error error={error} className={styles.msgError} />
                )
            }
        </div>
    );
});
