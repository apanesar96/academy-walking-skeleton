import FindUserById from './FindUserById'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axios from 'axios';
import { act } from 'react-dom/test-utils';


jest.mock('axios');

const renderPage = async () => render(<FindUserById />);

const mockFetchUsers = results => {
    axios.get.mockImplementation(() => Promise.resolve({
        data: results
    }));
}

const mockUser = {
    name: "John",
    age: 30,
    dateOfBirth: "2018-10-15"
}

describe('FindUserById', () => {

    it('requests user by id and displays the user', async () => {
        mockFetchUsers(mockUser);
        await renderPage();
        const expectedTestFromApi = ['John', '30', '2018-10-15'];
        const inputField = screen.getByTestId('user-id');
        const button = screen.getByText('find by id', { selector: 'button' });
        
         await act(async () => {
            userEvent.type(inputField, "1");
            userEvent.click(button);
        });

        expectedTestFromApi.forEach( expectedResult => {
            expect(screen.getByText(expectedResult)).toBeInTheDocument();
        })
    });

    it('requests user by id and throws an error', async () => {
        mockFetchUsers(null);
        const alertMock = jest.spyOn(window, 'alert').mockImplementation();
        await renderPage();
        //const expectedTestFromApi = [];
        const inputField = screen.getByTestId('user-id');
        const button = screen.getByText('find by id', { selector: 'button' });
        
         await act( async () => {
            userEvent.type(inputField, "1");
            userEvent.click(button);
        });

        expect(alertMock).toHaveBeenCalledTimes(1);
    });
});