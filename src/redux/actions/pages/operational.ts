import axios from 'axios'
import { map } from 'lodash'

import Constants from '../../../utils/constants'

export const operationalActions = {

    SET_COST: 'SET_COST',
    SET_SELECTED_ORDER: 'SET_SELECTED_ORDER',
}

export const fetchCostRawMaterial = () => {

    const value: Promise<number> = axios.get(`${Constants.Financial_API.address}${Constants.Financial_API.routes.CustoMateriaPrima}`)
    .then((response) => response.data)
    .catch((error) => { console.log(error); return 0 })

    console.log(value)

    return value
}

export const fetchEmployee = () => {

}

export const setCost = (cost: number) => ({
    
    type: operationalActions.SET_COST,
    payload: cost,
})

export const setSelectedOrder = (order: any) => ({

    type: operationalActions.SET_SELECTED_ORDER,
    payload: order,
})