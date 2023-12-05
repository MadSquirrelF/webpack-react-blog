/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import OrderUpIcon from 'shared/assets/icons/sort-up-icon.svg';
import OrderDownIcon from 'shared/assets/icons/sort-down-icon.svg';
import SortDateIcon from 'shared/assets/icons/sort-time-icon.svg';
import SortViewIcon from 'shared/assets/icons/sort-view-icon.svg';
import SortTitleIcon from 'shared/assets/icons/sort-title-icon.svg';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

import { ArticleOrder, ArticleSortField } from 'entities/Article/model/types/article';
import styles from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
  className?: string;
  order: ArticleOrder;
  sort: ArticleSortField;
  onOrderClick?: (order: ArticleOrder) => void;
  onSortClick?: (sort: ArticleSortField) => void;
}

const OrderTypes = [
    {
        order: ArticleOrder.ASC,
        Icon: OrderUpIcon,
    },
    {
        order: ArticleOrder.DESC,
        Icon: OrderDownIcon,
    },
];

export const ArticleSortSelector = memo(({
    className, order, sort, onSortClick, onOrderClick,
}: ArticleSortSelectorProps) => {
    const { t } = useTranslation('article');

    const onClickOrder = (newOrder: ArticleOrder) => () => {
        onOrderClick?.(newOrder);
    };

    const onClickSort = (newSort: ArticleSortField) => () => {
        onSortClick?.(newSort);
    };

    const SortTypes = [
        {
            sort: ArticleSortField.CREATED,
            Icon: SortDateIcon,
            value: t('Дате'),
        },
        {
            sort: ArticleSortField.TITLE,
            Icon: SortTitleIcon,
            value: t('Названию'),
        },
        {
            sort: ArticleSortField.VIEWS,
            Icon: SortViewIcon,
            value: t('Просмотрам'),
        },
    ];

    return (
        <div className={classNames(styles.ArticleSortSelector, {}, [className])}>
            <span className={styles.sortTitle}>{ t('Сортировать по:')}</span>
            <div className={styles.sortWrapper}>
                {
                    SortTypes.map((sortType) => (
                        <Button
                            theme={ThemeButton.SELECTOR}
                            key={sortType.sort}
                            className={classNames(styles.sortSelect, { [styles.active]: sortType.sort === sort })}
                            onClick={onClickSort(sortType.sort)}
                        >
                            <sortType.Icon className={styles.icon} />
                            <span className={styles.name}>{sortType.value}</span>
                        </Button>
                    ))
                }
            </div>
            <div className={styles.orderWrapper}>
                {
                    OrderTypes.map((orderType) => (
                        <Button
                            theme={ThemeButton.SELECTOR}
                            key={orderType.order}
                            onClick={onClickOrder(orderType.order)}
                            className={classNames(styles.orderSelect, { [styles.selected]: orderType.order === order })}
                        >
                            <orderType.Icon className={styles.icon} />
                        </Button>
                    ))
                }
            </div>
        </div>
    );
});
