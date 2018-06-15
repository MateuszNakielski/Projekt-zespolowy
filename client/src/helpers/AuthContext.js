import React from 'react'
const AuthContext = React.createContext(
    {
        isAuthenticated: false,
        username: null,
        displayName: null,
        roles: [],
        login: (data) => { },
        logout: () => { },
        register: (data) => { },
        hasRole: (role) => { },
    });

export default AuthContext