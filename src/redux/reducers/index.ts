import { combineReducers } from 'redux'

import select from './components/select'
import operationalPage from './pages/operational'

const reducers = combineReducers({

    select,
    operationalPage,
})

export default reducers