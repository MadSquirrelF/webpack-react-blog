import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import EyeClosed from 'shared/assets/icons/icon-closed-eye.svg';
import EyeOpened from 'shared/assets/icons/icon-opened-eye.svg';
import styles from './Input.module.scss';
import { Button, ThemeButton } from '../Button/Button';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  placeholder: string;
  label: string;
  isPassword?: boolean;
  onChange?: (value: string) => unknown;
  autofocus?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        className, value, onChange, autofocus, placeholder, isPassword, label, type = 'text', ...otherProps
    } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const ref = useRef<HTMLInputElement>();

    const [isPasswordShown, setPasswordShown] = useState(false);

    const ChangeInputType = isPasswordShown ? 'text' : 'password';

    const mods: Record<string, boolean> = {
        [styles.password]: isPassword,
    };

    useEffect(() => {
        if (autofocus) {
            ref.current?.focus();
        }
    }, [autofocus]);

    return (
        <div className={classNames(styles.FieldBox, {}, [className])}>
            <label htmlFor={label} className={styles.label}>
                {label}
            </label>
            <div className={classNames(styles.InputWrapper, mods, [])}>
                <input
                    ref={ref}
                    type={isPassword ? ChangeInputType : type}
                    className={styles.input}
                    id={label}
                    placeholder={placeholder}
                    name={label}
                    value={value}
                    onChange={onChangeHandler}
                    {...otherProps}
                />
                {
                    isPassword && (
                        <Button
                            className={styles.eyeBtn}
                            theme={ThemeButton.SVG_BTN}
                            onClick={() => setPasswordShown(!isPasswordShown)}
                        >
                            {isPasswordShown ? <EyeClosed /> : <EyeOpened />}
                        </Button>
                    )
                }
            </div>

        </div>
    );
});
