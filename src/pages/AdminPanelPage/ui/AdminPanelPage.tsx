/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import styles from './AdminPanelPage.module.scss';

interface AdminPanelPageProps {
  className?: string;
}

const AdminPanelPage = memo(({ className }: AdminPanelPageProps) => {
    const { t } = useTranslation();
    return (
        <Page className={classNames(styles.AdminPanelPage, {}, [className])}>
            AdminPanelPage
        </Page>
    );
});

export default AdminPanelPage;
