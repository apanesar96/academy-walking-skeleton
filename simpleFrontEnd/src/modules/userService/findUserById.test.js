import axios from 'axios';
import findUserById from './findUserById';

describe('findUserById', () => {
    it('calls the endpoint', () => {

        const mockAxiosGet = jest.spyOn(axios, "get").mockImplementation();
        findUserById(1);
        expect(mockAxiosGet).toHaveBeenCalledWith("http://localhost:8080/getUserById/1");
    })

    it('returns a promise', () => {
        jest.spyOn(axios, "get").mockImplementation(() => new Promise(() => null, () => null));
        
        expect(findUserById(1)).toBeInstanceOf(Promise);
    })
})