import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, memo, useMemo } from 'react';
import styles from './Select.module.scss';

export interface SelectOption {
    value: string;
    content: string;
}

interface SelectProps {
  className?: string;
  label: string;
  options?: SelectOption[];
  onChange?: (value: string) => void;
  value?: string;
  readonly?: boolean;
}

export const Select = memo((props: SelectProps) => {
    const { t } = useTranslation();

    const {
        className,
        label,
        readonly,
        options,
        onChange,
        value,
    } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    const optionsList = useMemo(() => options?.map((item) => (
        <option className={styles.option} value={item.value} key={item.value}>{item.content}</option>
    )), [options]);

    return (
        <div className={classNames(styles.Wrapper, {}, [className])}>
            <label htmlFor={label} className={styles.label}>
                {label}
            </label>

            <select disabled={readonly} className={styles.select} value={value} onChange={onChangeHandler}>
                {optionsList}
            </select>
        </div>
    );
});
