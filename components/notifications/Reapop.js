import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import NotificationsSystem, {atalhoTheme, dismissNotification, setUpNotifications} from 'reapop'

setUpNotifications({
    defaultProps: {
        position: 'top-right',
        dismissible: true
    } 
})

const Reapop = () => {
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notifications)

    const func = () => {
        console.log('test')
    }
    
    return (
        <div>
            <NotificationsSystem
                // 2. Pass the notifications you want Reapop to display.
                notifications={notifications}
                // 3. Pass the function used to dismiss a notification.
                dismissNotification={(func) => dispatch(dismissNotification(func))}
                // 4. Pass a builtIn theme or a custom theme.
                theme={atalhoTheme}
            />
        </div>
    )
}

export default Reapop