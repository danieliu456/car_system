export function authHeader(){
    // returns auth header with basic auth crendential, if user is not logged in return empty object

    let user = JSON.parse(localStorage.getItem('user'));

    if(user && user.authdata) {
        return {'Authorization' : 'Basic ' + user.authdata};
    } else
    {
        return {};
    }
} 