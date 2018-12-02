import { connect } from 'react-redux'
import { 
    fetchCostRawMaterial, 
    setCost, 
    setSelectedOrder, 
    setOptions, 
    setProductionOrders,
    fetchProductionOrders,
    createOptionsProductionOrder,
} from '../../redux/actions/pages/operational'

const mapStateToProps = (state: any, own: any) => {

    const props = {

        cost_raw_material: state.operationalPage.cost_raw_material,
        selected_order: state.operationalPage.selected_order,
        options: state.operationalPage.options,
        production_orders: state.operationalPage.production_orders,
    }

    return props
}

const mapDispatchToProps = (dispatch: any) => {

    return {

        fetchCostRawMaterial: () => {

            fetchCostRawMaterial()
            .then((response) => dispatch(setCost(response)))
            .catch((error) => dispatch(setCost(error)))
        },

        setSelectedOrder: (order: any) => {
            dispatch(setSelectedOrder(order))
        },

        fetchOptions: () => {

            fetchProductionOrders()
            .then((response) => { dispatch(setOptions(createOptionsProductionOrder(response))); dispatch(setProductionOrders(response)) })
            .catch((error) => { dispatch(setOptions(createOptionsProductionOrder(error))); dispatch(setProductionOrders(error)) })
        }
    }
}

export default (componentClass: any) => connect(mapStateToProps, mapDispatchToProps)(componentClass)