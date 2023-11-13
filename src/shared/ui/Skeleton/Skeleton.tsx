/* eslint-disable i18next/no-literal-string */
import { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
}

export const Skeleton = memo((props: SkeletonProps) => {
    const {
        className, height, width, border,
    } = props;

    const style: CSSProperties = {
        height,
        width,
        borderRadius: border,
    };
    return (
        <div className={classNames(styles.Skeleton, {}, [className])} style={style} />
    );
});
