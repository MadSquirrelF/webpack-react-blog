import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CountriesSelect } from './CountriesSelect';

export default {
    title: 'entities/CountriesSelect',
    component: CountriesSelect,

    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CountriesSelect>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof CountriesSelect> = (args) => <CountriesSelect {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
