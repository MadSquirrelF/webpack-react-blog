import { ReactNode, useState } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import UpDownIcon from 'shared/assets/icons/up-down-icon.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import SelectedIcon from 'shared/assets/icons/selected-icon.svg';
import styles from './ListBox.module.scss';

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps {
  items: ListBoxItem[];
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  readonly?: boolean;
  label?: string;
}

export function ListBox(props: ListBoxProps) {
    const {
        items, className, value, label, defaultValue, readonly, onChange,
    } = props;

    return (
        <HListBox
            disabled={readonly}
            as="div"
            className={classNames(styles.ListBox, {}, [className])}
            value={value}
            onChange={onChange}
        >
            <label htmlFor={value} className={styles.label}>
                {label}
            </label>
            <HListBox.Button id={value} className={styles.trigger} aria-disabled={readonly}>
                {value ?? defaultValue}
                {' '}
                <UpDownIcon />
            </HListBox.Button>
            <HListBox.Options className={styles.options}>
                {items.map((item) => (
                    <HListBox.Option
                        key={item.value}
                        value={item.value}
                        disabled={item.disabled}
                        className={classNames(
                            styles.item,
                            {
                                [styles.selected]: item.value === value,
                                [styles.disabled]: item.disabled,
                            },
                        )}
                    >
                        <SelectedIcon />
                        {item.content}
                    </HListBox.Option>
                ))}
            </HListBox.Options>
        </HListBox>
    );
}
