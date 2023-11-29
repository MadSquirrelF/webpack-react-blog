/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import ListIcon from 'shared/assets/icons/list-icon.svg';
import GridIcon from 'shared/assets/icons/grid-icon.svg';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { ArticleView } from '../../model/types/article';
import styles from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.FULL,
        Icon: ListIcon,
    },
    {
        view: ArticleView.SHORT,
        Icon: GridIcon,
    },
];

export const ArticleViewSelector = memo(({ className, view, onViewClick }: ArticleViewSelectorProps) => {
    const { t } = useTranslation();

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <div className={classNames(styles.ArticleViewSelector, {}, [className])}>
            {
                viewTypes.map((viewTypes) => (
                    <Button
                        theme={ThemeButton.SELECTOR}
                        onClick={onClick(viewTypes.view)}
                        className={classNames(styles.viewSelect, { [styles.selected]: viewTypes.view === view })}
                    >
                        <viewTypes.Icon className={styles.icon} />
                    </Button>
                ))
            }
        </div>
    );
});
