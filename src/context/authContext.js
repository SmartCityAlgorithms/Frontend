import {createContext} from 'react';

function  noop() {}

export const AuthContext = createContext({
    token: null,
    region: null,
    branch: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
});
