import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';
import i18nforTest from '../../../config/i18n/i18nforTest';

export interface componentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>
}

export function componentRender(component: ReactNode, options: componentRenderOptions = {}) {
    const { route = '/', initialState } = options;
    return render(
        <StoreProvider initialState={initialState}>
            <MemoryRouter initialEntries={[route]}>
                <I18nextProvider i18n={i18nforTest}>
                    {component}
                </I18nextProvider>
            </MemoryRouter>
        </StoreProvider>,
    );
}
