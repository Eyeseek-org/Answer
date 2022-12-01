import { combineReducers, createStore } from 'redux'
import {reducer as notificationsReducer} from 'reapop'


const rootReducer = combineReducers({
    notifications: notificationsReducer()
})

export const store = createStore(rootReducer)
