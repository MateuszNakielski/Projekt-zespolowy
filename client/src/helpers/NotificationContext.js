import React from 'react'
const NotificationContext = React.createContext(
    {
        addNotification: ({message}) => {}
    });

export default NotificationContext