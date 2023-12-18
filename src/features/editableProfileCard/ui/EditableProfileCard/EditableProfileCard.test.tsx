import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Profile } from 'entities/Profile';
import { Country } from 'entities/Countries';
import { Currency } from 'entities/Currency';
import userEvent from '@testing-library/user-event';
import { $api } from 'shared/api/api';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
    id: '1',
    username: 'admin',
    age: 22,
    country: Country.Russia,
    lastname: 'Shabanov',
    firstname: 'Artem',
    city: 'Chelyabinsk',
    currency: Currency.RUB,
};

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        user: {
            authData: {
                id: '1',
                username: 'admin',
            },
        },
    },
    asyncReducers: { profile: profileReducer },
};

describe('features/EditableProfileCard.test', () => {
    // beforeEach(() => {
    //     jest.spyOn($api, 'get').mockReturnValue(
    //         Promise.resolve({
    //             data: profile,
    //         }),
    //     );
    // });
    test('readOnly shoud chande to edit', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
        expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
    });

    test('After clicking cancel button input values should return prev value', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        await userEvent.clear(screen.getByTestId('ProfileCard.Firstname'));
        await userEvent.clear(screen.getByTestId('ProfileCard.Lastname'));

        await userEvent.type(screen.getByTestId('ProfileCard.Firstname'), 'user');
        await userEvent.type(screen.getByTestId('ProfileCard.Lastname'), 'user');

        expect(screen.getByTestId('ProfileCard.Firstname')).toHaveValue('user');

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));

        expect(screen.getByTestId('ProfileCard.Firstname')).toHaveValue('Artem');
        expect(screen.getByTestId('ProfileCard.Lastname')).toHaveValue('Shabanov');
    });

    test('Error SHOULD appear IF Firstname or Lastname is Empty', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        await userEvent.clear(screen.getByTestId('ProfileCard.Firstname'));

        expect(screen.getByTestId('ProfileCard.Firstname')).toHaveValue('');

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

        expect(screen.getByTestId('EditableProfileCard.Error.Text')).toBeInTheDocument();
    });

    test('IF no validations errors SHOULD send put request', async () => {
        const mockPutReq = jest.spyOn($api, 'put');
        componentRender(<EditableProfileCard id="1" />, options);

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        await userEvent.type(screen.getByTestId('ProfileCard.Firstname'), 'Artem2');

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

        expect(mockPutReq).toHaveBeenCalled();
    });
});
