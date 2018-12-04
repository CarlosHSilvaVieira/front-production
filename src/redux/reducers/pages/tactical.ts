import { tacticalActions } from '../../actions/pages/tactical'

const initialState = {}
export default (state = initialState, action: any) => {

    switch (action.type) {

        case tacticalActions.SET_COST:
            return { ...state, cost_raw_material: action.payload }

        case tacticalActions.SET_DATA:
            return { ...state, data: action.payload }

        case tacticalActions.SET_MONTH:
            return { ...state, month: action.payload }

        case tacticalActions.SET_YEAR:
            return { ...state, year: action.payload }

        case tacticalActions.SET_HOURS:
            return { ...state, worked_hours: action.payload }

        case tacticalActions.SET_PRODUCTION:
            return { ...state, productions: action.payload }

        case tacticalActions.SET_PRODUCTION_ORDERS:
            return { ...state, production_orders: action.payload }

        default:
            return state
    }
}
