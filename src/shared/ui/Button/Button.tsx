/* eslint-disable no-unused-vars */
import { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Button.module.scss';

export enum ThemeButton {
  CLEAR = 'clear',
  CLEAR_INVERT = 'clearInverted',
  DEFAULT = 'default',
  DECLINE = 'decline',
  SVG_BTN = 'svg_btn',
  ERROR_CLOSE = 'close_error',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERT = 'backgroundInverted',
}

export enum SizeButton {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
  square?: boolean;
  size?: SizeButton;
  disabled?: boolean;
}
export const Button: FC<ButtonProps> = (props) => {
    const {
        className, children, square, size = SizeButton.L, disabled, theme, ...otherProps
    } = props;

    const mods: Record<string, boolean> = {
        [styles[theme]]: true,
        [styles.square]: square,
        [styles[size]]: true,
        [styles.disabled]: disabled,
    };
    return (
        <button
            disabled={disabled}
            type="button"
            className={classNames(styles.Button, mods, [className])}
            {...otherProps}
        >
            {children}
        </button>
    );
};
