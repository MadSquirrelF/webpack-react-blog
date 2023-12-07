/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { Loader, ThemeLoader } from 'shared/ui/Loader/Loader';
import { Error } from 'shared/ui/Error/Error';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import defaultAvatar from 'shared/assets/images/defaultAvatar.jpg';
import { Currency, CurrencySelect } from 'entities/Currency';
import { CountriesSelect, Country } from 'entities/Countries';
import { ProfilePageHeader } from 'pages/ProfilePage/ui/ProfilePageHeader/ProfilePageHeader';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import ImageIcon from 'shared/assets/icons/image-icon.svg';
import TrashIcon from 'shared/assets/icons/trash-icon.svg';
import { Profile } from '../../model/types/profile';
import styles from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  readonly?: boolean;
  onChangeFirstname?: (value: string) => void;
  onChangeLastname?: (value: string) => void;
  onChangeAge?: (value: string) => void;
  onChangeCity?: (value: string) => void;
  onChangeUsername?: (value: string) => void;
  onChangeAvatar?: (value: string) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeCountries?: (country: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const { t } = useTranslation('profile');

    const {
        error,
        isLoading,
        className,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountries,
        readonly,
        data,
    } = props;

    if (isLoading) {
        return (
            <div className={classNames(styles.ProfileCard, { [styles.loading]: true }, [className])}>
                <Loader theme={ThemeLoader.MAIN_LOADER} />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(styles.ProfileCard, {}, [className, styles.error])}>
                <Error error={t('Ошибка при загрузке профиля')} />
            </div>
        );
    }

    const mods: Mods = {
        [styles.editing]: !readonly,
    };

    return (
        <div className={classNames(styles.ProfileCard, mods, [className])}>
            <ProfilePageHeader />
            <div className={styles.data}>
                <div className={styles.top}>
                    {
                        data?.avatar ? (
                            <Avatar className={styles.avatar} src={data.avatar} alt="user avatar" size={200} />
                        ) : <Avatar className={styles.avatar} src={defaultAvatar} alt="default avatar" size={200} />
                    }

                    <div className={styles.btnWrapper}>
                        <Button theme={ThemeButton.OUTLINE} className={styles.avatarSettingBtn}>
                            <ImageIcon />
                            <span>{t('Сменить')}</span>
                        </Button>
                        <Button theme={ThemeButton.OUTLINE} className={styles.avatarSettingBtn}>
                            <TrashIcon />
                            <span>{t('Удалить')}</span>
                        </Button>
                    </div>

                </div>

                <div className={styles.flexBox}>
                    <div className={styles.InputContainer}>
                        <Input
                            value={data?.firstname}
                            placeholder={t('Ваше имя')}
                            label={t('Имя')}
                            onChange={onChangeFirstname}
                            readonly={readonly}
                            className={styles.input}
                        />
                        <Input
                            value={data?.lastname}
                            placeholder={t('Ваша фамилия')}
                            label={t('Фамилия')}
                            className={styles.input}
                            readonly={readonly}
                            onChange={onChangeLastname}
                        />
                        <Input
                            value={data?.username}
                            placeholder={t('Ваше имя пользователя')}
                            label={t('Имя пользователя')}
                            className={styles.input}
                            readonly={readonly}
                            onChange={onChangeUsername}
                        />
                        <Input
                            value={data?.age}
                            placeholder={t('Ваш возраст')}
                            label={t('Возраст')}
                            className={styles.input}
                            readonly={readonly}
                            onChange={onChangeAge}
                        />

                    </div>

                    <div className={styles.InputContainer}>
                        <CurrencySelect
                            value={data?.currency}
                            onChange={onChangeCurrency}
                            readonly={readonly}
                            className={styles.input}
                        />
                        <CountriesSelect
                            value={data?.country}
                            onChange={onChangeCountries}
                            readonly={readonly}
                            className={styles.input}
                        />

                        <Input
                            value={data?.avatar}
                            placeholder={t('Аватар')}
                            label={t('Ваш аватар')}
                            className={styles.input}
                            readonly={readonly}
                            onChange={onChangeAvatar}
                        />

                        <Input
                            value={data?.city}
                            placeholder={t('Ваш город')}
                            label={t('Город')}
                            className={styles.input}
                            readonly={readonly}
                            onChange={onChangeCity}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};
