import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import CloseIcon from 'shared/assets/icons/icon-close-error.svg';

import { Button, SizeButton, ThemeButton } from './Button';

export default {
    title: 'shared/Button',
    component: Button,

    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Clear = Template.bind({});
Clear.args = {
    children: 'Text',
    theme: ThemeButton.CLEAR,
};

export const Default = Template.bind({});
Default.args = {
    children: 'Text',
    theme: ThemeButton.DEFAULT,
};

export const Decline = Template.bind({});
Decline.args = {
    children: 'Text',
    theme: ThemeButton.DECLINE,
};

export const DeclineDisabled = Template.bind({});
DeclineDisabled.args = {
    children: 'Text',
    theme: ThemeButton.DECLINE,
    disabled: true,
};

export const DefaultDisabled = Template.bind({});
DefaultDisabled.args = {
    children: 'Text',
    theme: ThemeButton.DEFAULT,
    disabled: true,
};

export const CloseError = Template.bind({});
CloseError.args = {
    children: <CloseIcon />,
    theme: ThemeButton.ERROR_CLOSE,
};

export const Svg = Template.bind({});
Svg.args = {
    children: '+',
    theme: ThemeButton.SVG_BTN,
};

export const ClearInverted = Template.bind({});
ClearInverted.args = {
    children: 'Text',
    theme: ThemeButton.CLEAR_INVERT,
};

export const Outline = Template.bind({});
Outline.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
};

export const OutlineSizeL = Template.bind({});
OutlineSizeL.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
    size: SizeButton.L,
};

export const OutlineSizeXl = Template.bind({});
OutlineSizeXl.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
    size: SizeButton.XL,
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundTheme = Template.bind({});
BackgroundTheme.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND,
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND,
};

export const Square = Template.bind({});
Square.args = {
    children: '>',
    theme: ThemeButton.BACKGROUND,
    square: true,
};

export const SquareSizeL = Template.bind({});
SquareSizeL.args = {
    children: '>',
    theme: ThemeButton.BACKGROUND,
    square: true,
    size: SizeButton.L,
};

export const SquareSizeXl = Template.bind({});
SquareSizeXl.args = {
    children: '>',
    theme: ThemeButton.BACKGROUND,
    square: true,
    size: SizeButton.XL,
};
