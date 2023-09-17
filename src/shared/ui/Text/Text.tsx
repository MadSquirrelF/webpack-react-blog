import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import styles from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
}

export const Text = memo((props: TextProps) => {
    const { t } = useTranslation();
    const {
        className, title, text, theme = TextTheme.PRIMARY,
    } = props;
    return (
        <div className={classNames(styles.TextWrapper, { [styles[theme]]: true }, [className])}>
            { title && (<p className={styles.title}>{title}</p>)}
            { text && (<p className={styles.text}>{text}</p>)}
        </div>
    );
});
