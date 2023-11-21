import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CommentCard } from './CommentCard';

export default {
    title: 'entities/CommentCard',
    component: CommentCard,

    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentCard>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    comment: {
        id: '1',
        text: 'Hello there!',
        user: {
            id: '1',
            username: 'Artem',
        },
    },
};

export const Loading = Template.bind({});
Loading.args = {
    comment: {
        id: '1',
        text: 'Hello there!',
        user: {
            id: '1',
            username: 'Artem',
        },
    },
    isLoading: true,
};
