import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { action } from '@storybook/addon-actions';
import { ListBox } from './ListBox';

export default {
    title: 'shared/ListBox',
    component: ListBox,

    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof ListBox>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    items: [
        {
            value: 'Durward Reynolds',
            content: 'Durward Reynolds',
            disabled: false,
        },
        {
            value: 'Kenton Towne',
            content: 'Kenton Towne',
            disabled: true,
        },
        {
            value: 'Therese Wunsch',
            content: 'Therese Wunsch',
            disabled: false,
        },
    ],
    value: 'Durward Reynolds',
    onChange: action('onChange'),
    defaultValue: 'Choose value',
};

export const Dark = Template.bind({});

Dark.args = {
    items: [
        {
            value: 'Durward Reynolds',
            content: 'Durward Reynolds',
            disabled: false,
        },
        {
            value: 'Kenton Towne',
            content: 'Kenton Towne',
            disabled: true,
        },
        {
            value: 'Therese Wunsch',
            content: 'Therese Wunsch',
            disabled: false,
        },
    ],
    value: 'Durward Reynolds',
    onChange: action('onChange'),
    defaultValue: 'Choose value',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
