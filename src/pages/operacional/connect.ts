import { connect } from 'react-redux'
import { fetchCostRawMaterial, setCost, setSelectedOrder } from '../../redux/actions/pages/operational'

const mapStateToProps = (state: any, own: any) => {

    const props = {

        cost_raw_material: state.operationalPage.cost_raw_material,
        order: state.operationalPage.order
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
        }
    }
}

export default (componentClass: any) => connect(mapStateToProps, mapDispatchToProps)(componentClass)