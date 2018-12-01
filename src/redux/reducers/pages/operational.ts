import { operationalActions } from '../../actions/pages/operational'

const initialState = {}
export default (state = initialState, action: any) => {

    switch (action.type) {

        case operationalActions.SET_COST:
            return { ...state, cost_raw_material: action.payload }

        case operationalActions.SET_SELECTED_ORDER:
            return { ...state, order: action.payload }

        default:
            return state
    }
}