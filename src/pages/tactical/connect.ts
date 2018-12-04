import { connect } from 'react-redux'

import {
    setCost,
    setMonth,
    setYear,
    setProduction,
    setProductionOrders,
    fetchCostRawMaterial,
    fetchProdOrders,
    fetchProduction,
    fetchHoursMonth,
    setData,
    processProductionByMonth,
    setTotalHours,
} from '../../redux/actions/pages/tactical'

const mapStateToPros = (state: any) => {

    const props = {

        cost_raw_material: state.tacticalPage.cost_raw_material,
        month: state.tacticalPage.month,
        year: state.tacticalPage.year,
        productions: state.tacticalPage.productions,
        production_orders: state.tacticalPage.production_orders,
        data: state.tacticalPage.data,
        worked_hours: state.tacticalPage.worked_hours,
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

        fetchProdOrders: (month: number, year: number) => {

            fetchProdOrders(month, year)
            .then((response) => dispatch(setProductionOrders(response)))
            .catch((error) => dispatch(setProductionOrders(error)))
        },

        fetchProduction: (month: number, year: number) => {

            fetchProduction(month, year)
            .then((response) => dispatch(setProduction(response)))
            .catch((error) => dispatch(setProduction(error)))
        },

        fetchHoursMonth: (month: number) => {

            fetchHoursMonth(month)
            .then((response) => dispatch(setTotalHours(response)))
            .catch((error) => dispatch(setTotalHours(error)))
        },

        setYear: (year: number) => {
            dispatch(setYear(year))
        },

        setMonth: (month: number) => {
            dispatch(setMonth(month))
        },

        setData: (data: any) => {

            dispatch(setData(data))
        },
    }
}

export default (componentClass: any) => connect(mapStateToPros, mapDispatchToProps)(componentClass)
