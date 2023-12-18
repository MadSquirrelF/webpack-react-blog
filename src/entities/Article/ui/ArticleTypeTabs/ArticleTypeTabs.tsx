/* eslint-disable i18next/no-literal-string */
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { ArticleType } from '../../model/types/article';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo(({ className, value, onChangeType }: ArticleTypeTabsProps) => {
    const { t } = useTranslation('article');

    const typeTabs = useMemo(() => Object.values(ArticleType).reduce((acc: TabItem[], cur) => ([
        ...acc,
        { value: cur, content: t(cur, { ns: 'article' }) },
    ]), []), [t]);

    const onTabClick = useCallback((tab: TabItem) => {
        onChangeType(tab.value as ArticleType);
    }, [onChangeType]);

    return (
        <Tabs
            onTabClick={onTabClick}
            tabs={typeTabs}
            value={value}
            className={classNames('', {}, [className])}
        />

    );
});
