import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';

import styles from './Error.module.scss';

interface ErrorProps {
  className?: string;
  error: string;
}

export const Error = (props: ErrorProps) => {
    const { t } = useTranslation();
    const { className, error } = props;
    return (
        <div className={classNames(styles.error, {}, [className])}>
            <p className={styles.title}>{error}</p>
        </div>
    );
};
