import config from 'config';
import {authHeader} from '../_helpers';
var crypto = require('crypto');


export const userService = {
    login,
    logout,
    getAll
};

function login(username, passwordx) {
    console.log(passwordx);
    var password = crypto.createHash('md5').update(passwordx).digest('hex');
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    //cripto
    console.log(password);

    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then(user => {
        // login succesful if there is a user 
        if(user) {
            user.authdata = window.btoa(username+ ':' + password);
            console.log("user.service ----> LOGIN SUCCESsFUL user" + JSON.stringify(user));
            localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
    })
}

function logout() {
    console.log("LOGGED OUT")
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}