/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { memo, useCallback, useEffect } from 'react';
import { loginActions, loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { Error } from 'shared/ui/Error/Error';
import { Loader, ThemeLoader } from 'shared/ui/Loader/Loader';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import styles from './LoginForm.module.scss';

export interface LoginFormProps {
 className?: string;
}

const initialReducers: ReducerList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginIsLoading);

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
        <DynamicModuleLoader removeAfteUnmount reducers={initialReducers}>
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
                <Button
                    disabled={isLoading}
                    className={styles.loginBtn}
                    theme={ThemeButton.DEFAULT}
                    onClick={onLoginClick}
                >
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
        </DynamicModuleLoader>
    );
});

export default LoginForm;
