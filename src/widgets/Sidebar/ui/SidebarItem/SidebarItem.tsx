import { useTranslation } from 'react-i18next';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { getUserAuthData } from 'entities/User';
import { useSelector } from 'react-redux';
import styles from './SidebarItem.module.scss';
import { SidebarItemType } from '../../model/types/sidebar';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    const { t } = useTranslation();

    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
        return null;
    }

    return (
        <li className={classNames(styles.item, { [styles.collapsed]: collapsed })}>
            <AppLink
                to={item.path}
                className={styles.link}
            >
                <item.Icon className={styles.icon} />
                <p className={styles.text}>
                    {t(item.text)}
                </p>
            </AppLink>

        </li>

    );
});
