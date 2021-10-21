import deleteUserById from './deleteUserById';
import axios from 'axios';

describe('deleteUserById', () => {
    it('calls the endpoint', () => {
        const mockAxiosDelete = jest.spyOn(axios, 'delete').mockImplementation();
        deleteUserById(1);
        expect(mockAxiosDelete).toHaveBeenCalledWith('http://localhost:8080/deleteUserById/1');
    })

    it('returns a promise', () => {
        jest.spyOn(axios, "delete").mockImplementation(() => new Promise(() => null, () => null));

        expect(deleteUserById(1)).toBeInstanceOf(Promise);
    })
})