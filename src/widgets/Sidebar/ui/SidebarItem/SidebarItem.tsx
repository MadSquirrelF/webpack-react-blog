import { useTranslation } from 'react-i18next';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { SidebarItemType } from 'widgets/Sidebar/model/items';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './SidebarItem.module.scss';

interface SidebarItemProps {
  item?: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    const { t } = useTranslation();
    return (
        <AppLink
            to={item.path}
            className={classNames(styles.item, { [styles.collapsed]: collapsed })}
        >
            <item.Icon className={styles.icon} />
            <span className={styles.link}>
                {t(item.text)}
            </span>

        </AppLink>
    );
});
