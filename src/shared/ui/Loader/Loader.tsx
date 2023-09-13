import { classNames } from 'shared/lib/classNames/classNames';
import './Loader.scss';

export enum ThemeLoader {
    MAIN_LOADER = 'mainLoader',
    BTN_LOADER = 'btnLoader'
}

interface LoaderProps {
    className?: string;
    theme?:ThemeLoader
}

export const Loader = ({ className, theme }: LoaderProps) => (
    <span className={classNames(theme, {}, [className])} />
);
