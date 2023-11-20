import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Country } from 'entities/Countries';
import { Currency } from 'entities/Currency';
import { fetchProfileData } from './fetchProfileData';

const data = {
    username: 'admin',
    age: 22,
    country: Country.Russia,
    lastname: 'Shananov',
    firstname: 'Artem',
    city: 'Chelyabinsk',
    currency: Currency.RUB,
};

describe('fetchProfileData.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);

        thunk.api.get.mockReturnValue(Promise.resolve({
            data,
        }));

        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();

        expect(result.meta.requestStatus).toBe('fulfilled');

        expect(result.payload).toEqual(data);
    });

    test('SHOULD return error ', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);

        thunk.api.get.mockReturnValue(Promise.resolve({
            status: 403,
        }));

        const result = await thunk.callThunk('1');

        expect(result.meta.requestStatus).toBe('rejected');
    });
});
