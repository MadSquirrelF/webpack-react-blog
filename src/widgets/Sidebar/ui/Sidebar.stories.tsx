import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Sidebar } from './Sidebar';

export default {
    title: 'widget/Sidebar',
    component: Sidebar,

    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Sidebar>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const Light = Template.bind({});

Light.args = {};

Light.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator(
    {
        user: {
            authData: {},
        },
    },
)];

export const Dark = Template.bind({});

Dark.args = {};

Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator(
    {
        user: {
            authData: {},
        },
    },
)];

export const NoAuth = Template.bind({});

NoAuth.args = {};

NoAuth.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator(
    {
        user: {

        },
    },
)];
