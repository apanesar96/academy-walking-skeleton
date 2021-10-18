import axios from 'axios';
import findUserById from './findUserById';

jest.mock('axios');

describe('findUserById', () => {
    it('calls the endpoint', () => {

        const mockAxiosGet = jest.spyOn(axios, "get").mockImplementation();
        findUserById(1);
        expect(mockAxiosGet).toHaveBeenCalledWith("http://localhost:8080/getUserById/1");
    })

    it('returns a promise', () => {
        jest.spyOn(axios, "get").mockImplementation(() => Promise.resolve());
        
        expect(findUserById(1)).toBeInstanceOf(Promise);
    })
})