import { connect } from 'react-redux'

import { fetchProductionOrders, createOptionsProductionOrder, setOptions } from '../../redux/actions/components/select'

const mapStateToProps = (state: any, own: any) => {

    const props = {

        options: state.select.options,
    }

    return props
}

const mapDispatchToProps = (dispatch: any) => {

    return {

        fetchOptions: () => {

            fetchProductionOrders()
            .then((response) => { dispatch(setOptions(createOptionsProductionOrder(response))) })
            .catch((error) => dispatch(setOptions([])))
        }
    }
}

export default (componentClass: any) => connect(mapStateToProps, mapDispatchToProps)(componentClass)