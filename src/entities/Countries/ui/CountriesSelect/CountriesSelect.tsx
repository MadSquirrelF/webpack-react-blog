import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
import { memo, useCallback, useMemo } from 'react';
import { ListBox } from 'shared/ui/ListBox/ListBox';
import { Country } from '../../model/types/countries';

interface CountriesSelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void
  readonly?: boolean;
}

export const CountriesSelect = memo(({
    className, value, onChange, readonly,
}: CountriesSelectProps) => {
    const { t } = useTranslation();

    const countriesOptions = useMemo(
        () => Object.entries(Country).map((val) => ({ value: val[0], content: val[1] })),
        [],
    );

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country);
    }, [onChange]);

    return (
        <ListBox
            value={value}
            className={className}
            readonly={readonly}
            label={t('Старана')}
            items={countriesOptions}
            onChange={onChangeHandler}
        />
    );
});
