/*
    This is our http api for all things auth, which we use to 
    send authorization requests to our back-end API. Note we`re 
    using the Axios library for doing this, which is an easy to 
    use AJAX-based library. We could (and maybe should) use Fetch, 
    which is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it`s a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /register). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE WE WILL FORMAT HERE, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES

export async function getLoggedIn() {
    const url = "http://localhost:4000/auth/loggedIn/";
    const response = await fetch(url, {
        mode: 'cors',
        credentials: 'include'
    });

    if (!response.ok) {
        let error = await response.json();
        throw error;
    }

    const result = await response.json();
    return result;
}

export async function loginUser(email: string, password: string) {
    const url = "http://localhost:4000/auth/login/";

    const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
            "email" : email,
            "password" : password
        })
    });

    if (!response.ok) {
        let error = await response.json();
        throw error;
    }

    return response;
    
}

export async function logoutUser() {
    const url = "http://localhost:4000/auth/logout/";
    const response = await fetch(url, {mode: 'cors'});
    if (!response.ok) {
        let error = await response.json();
        throw error;
    }
    return response;   
}

export async function registerUser(username: string, email: string, password: string, passwordVerify: string, avatar: string) {
    const url = "http://localhost:4000/auth/register/";

    const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
            "username" : username,
            "email": email,
            "password": password,
            "passwordVerify": passwordVerify,
            "avatar": avatar

        })
    });

    if (!response.ok) {
        let error = await response.json();
        throw error;
    }
    // const result = await response.json();
    return response;
    
}


const apis = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser
}

export default apis
