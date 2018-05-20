import React from 'react'
const AuthContext = React.createContext(
    {
        isAuthenticated: false,
        username: null,
        displayName: null,
        roles: [],
        login: (data) => { },
        register: (data) => { },
    });

export default AuthContext