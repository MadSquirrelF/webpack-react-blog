import { useTranslation } from 'react-i18next';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import styles from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

export enum TextSize {
    M = 'size_m',
    L = 'size_l',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
}

export const Text = memo((props: TextProps) => {
    const { t } = useTranslation();
    const {
        className, align = TextAlign.LEFT, title, text, theme = TextTheme.PRIMARY, size = TextSize.M,
    } = props;

    const mods: Mods = {
        [styles[theme]]: true,
        [styles[align]]: true,
        [styles[size]]: true,
    };
    return (
        <div className={classNames(styles.TextWrapper, mods, [className])}>
            { title && (<p className={styles.title}>{title}</p>)}
            { text && (<p className={styles.text}>{text}</p>)}
        </div>
    );
});
