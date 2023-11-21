import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import ArrowLeftIcon from 'shared/assets/icons/arrow-left.svg';
import ArrowRightIcon from 'shared/assets/icons/arrow-right.svg';
import { useSelector } from 'react-redux';
import { Button, SizeButton, ThemeButton } from '../../../shared/ui/Button/Button';
import styles from './Sidebar.module.scss';
import { SidebarItem } from './SidebarItem/SidebarItem';
import { getSidebarItems } from '../model/selectors/getSidebarItems';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const sidebarItemsList = useSelector(getSidebarItems);
    const { t } = useTranslation();

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const itemsList = useMemo(() => sidebarItemsList.map(((item) => (
        <SidebarItem key={item.path} item={item} collapsed={collapsed} />
    ))), [collapsed, sidebarItemsList]);

    return (
        <div
            data-testid="side_id"
            className={classNames(
                styles.Sidebar,
                { [styles.collapsed]: collapsed },
                [className],
            )}
        >
            <Button
                data-testid="sidebar-toggle"
                type="button"
                onClick={onToggle}
                theme={ThemeButton.BACKGROUND}
                square
                size={SizeButton.L}
                className={styles.collapsedBtn}
            >
                {collapsed ? <ArrowRightIcon /> : <ArrowLeftIcon />}
            </Button>

            <div className={styles.items}>
                {itemsList}
            </div>
            <div className={styles.switchers}>
                <LangSwitcher className={styles.lang} />
                <ThemeSwitcher short={collapsed} />
            </div>
        </div>
    );
});
