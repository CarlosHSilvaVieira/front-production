import { selectActions } from '../../actions/components/select'

const initialState = {}

export default (state = initialState, action: any) => {

    switch(action.type) {

        case selectActions.SET_OPTIONS: 
            return { ...state, options: action.payload }

        default:
            return state
    }
}