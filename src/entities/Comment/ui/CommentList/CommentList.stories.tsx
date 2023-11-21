import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CommentList } from './CommentList';

export default {
    title: 'entities/CommentList',
    component: CommentList,

    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentList>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    comments: [
        {
            id: '1',
            text: 'Hello there!',
            user: {
                id: '1',
                username: 'Artem',
            },
        },
        {
            id: '2',
            text: 'I am LOX',
            user: {
                id: '2',
                username: 'Nastya',
            },
        },
    ],
};

export const Loading = Template.bind({});
Loading.args = {
    comments: [
    ],
    isLoading: true,
};
