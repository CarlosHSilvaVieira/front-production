import axios from 'axios'
import { OptionInterface } from './../../../interfaces/option';
import { ProductionOrderInterface } from '../../../interfaces/production_order'
import { map } from 'lodash'

import Constants from '../../../utils/constants'

export const selectActions = {
    GET_PRODUCTIONS_ORDERS: 'GET_PRODUCTIONS_ORDERS',
    SET_OPTIONS: 'SET_OPTIONS',
}

export const fetchProductionOrders = () => {

    const orders: Promise<ProductionOrderInterface[]> = axios.get(`${Constants.Sales_API.address}${Constants.Sales_API.routes.Pedidos}`)
    .then((response) => response.data)
    .catch((error) => { console.log(error); return null })

    console.log(orders)

    return orders
}

export const createOptionsProductionOrder = (options: ProductionOrderInterface[]): OptionInterface<ProductionOrderInterface>[] => {

    return map(options, (option: ProductionOrderInterface) => {

        const new_option: OptionInterface<ProductionOrderInterface> = {
            label: option.id.toString(),
            value: option
        }

        return new_option
    })
}

export const setOptions = (options: OptionInterface<any>[]) => ({
    type: selectActions.SET_OPTIONS,
    payload: options
})
