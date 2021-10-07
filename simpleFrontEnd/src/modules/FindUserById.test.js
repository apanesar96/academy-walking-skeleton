import { FindUserById } from './FindUserById'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axios from 'axios';
import { act } from 'react-dom/test-utils';
import { when } from 'jest-when';


jest.mock('axios');

const renderPage = async () => render(<FindUserById />);

describe('FindUserById', () => {

    it('requests user by id and displays the user', async () => {

        await renderPage();

        const inputField = await screen.findAllByPlaceholderText('Input ID here');
        const button = screen.getByText('find by id', { selector: 'button' });

        when(axios.get).calledWith("http://localhost:8080/getUserById/?id=1").mockReturnValue(() => {
            Promise.resolve({
                data: {
                    name: "John",
                    age: 30,
                    dateOfBirth: "2018-10-15"
                }
            })
        })

        await act(async () => {
            userEvent.change(inputField, { target: { value: '1' } });
            userEvent.click(button);
        });

        expect(screen.getByText("John")).toBeInTheDocument();
        expect(screen.getByText("30")).toBeInTheDocument();
        expect(screen.getByText("2018-10-15")).toBeInTheDocument();
    });
});