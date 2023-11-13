/* eslint-disable i18next/no-literal-string */
import { memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import CopyIcon from 'shared/assets/icons/copy-icon.svg';
import styles from './Code.module.scss';
import { Button, ThemeButton } from '../Button/Button';

interface CodeProps {
  className?: string;
  text: string;
}

export const Code = memo((props: CodeProps) => {
    const { className, text } = props;

    const [copied, setIsCopied] = useState(false);

    const onCopy = useCallback(
        () => {
            navigator.clipboard.writeText(text);
            setIsCopied(true);

            setTimeout(() => {
                setIsCopied(false);
            }, 5000);
        },
        [text],
    );

    return (
        <pre className={classNames(styles.Code, {}, [className])}>
            <Button onClick={onCopy} className={styles.copyBtn} theme={ThemeButton.CLEAR} disabled={copied}>
                <CopyIcon className={styles.icon} />
            </Button>
            <code>
                {text}
            </code>
        </pre>
    );
});
