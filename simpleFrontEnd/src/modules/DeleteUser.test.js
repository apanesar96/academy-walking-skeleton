import { render, screen, fireEvent } from '@testing-library/react';
import DeleteUser from './DeleteUser';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import deleteUserById from './userService/deleteUserById'

jest.mock('./userService/deleteUserByID');

const renderPage = async () => render(<DeleteUser />);

describe('DeleteUser', () => { 
    it('displays an input field and a delete button', async () => {
        await renderPage()

        const inputField = screen.getByPlaceholderText('id');
        const button = screen.getByText('delete', { selector: 'button' });

        expect(inputField).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    })

    it('should delete the user with the given id', async () => {
        // given
        await renderPage()
        const mockDeleteUserById = deleteUserById.mockImplementation(() => new Promise(() => null, () => null));
        const inputField = screen.getByPlaceholderText('id');
        const button = screen.getByText('delete', { selector: 'button' });

        // when
        await act(async () => {
             userEvent.type(inputField, "1");
             userEvent.click(button)
        });

        // then
        expect(mockDeleteUserById.mockImplementation()).toHaveBeenCalledWith("1")
    })
})
