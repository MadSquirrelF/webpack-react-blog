import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
import { memo, useCallback, useMemo } from 'react';
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
        <Select
            label={t('Страна')}
            value={value}
            onChange={onChangeHandler}
            options={countriesOptions}
            readonly={readonly}
            className={classNames('', {}, [className])}
        />
    );
});
