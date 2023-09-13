import { I18nextProvider } from 'react-i18next';
import { Story } from '@storybook/react';
import i18nforTest from 'shared/config/i18n/i18nforTest';

export const TranslationDecorator = (StoryComponent: Story) => (
    <I18nextProvider i18n={i18nforTest}>
        <StoryComponent />
    </I18nextProvider>
);
