import FindUserById from './FindUserById'
import findUserById from './userService/findUserById';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

jest.mock('./userService/findUserById.js')

const renderPage = async () => render(<FindUserById />);

const mockUser = {
    name: "John",
    age: 30,
    dateOfBirth: "2018-10-15"
}

describe('FindUserById', () => {
    it('requests user by id and displays the user', async () => {
        findUserById.mockImplementation(() => Promise.resolve({
            data: mockUser
        }));
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

        const alertMock = jest.spyOn(window, 'alert').mockImplementation();
        findUserById.mockImplementation(() => Promise.reject());
        
        await renderPage();

        const inputField = screen.getByTestId('user-id');
        const button = screen.getByText('find by id', { selector: 'button' });
        
         await act( async () => {
            userEvent.type(inputField, "1");
            userEvent.click(button);
        });

        expect(alertMock).toHaveBeenCalledTimes(1);
    });
});