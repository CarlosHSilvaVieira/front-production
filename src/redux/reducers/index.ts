import { combineReducers } from 'redux'

import operationalPage from './pages/operational'
import tacticalPage from './pages/tactical'

const reducers = combineReducers({

    operationalPage,
    tacticalPage,
})

export default reducers