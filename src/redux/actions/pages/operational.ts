import axios from 'axios'
import { map } from 'lodash'

import { OptionInterface } from './../../../interfaces/option'
import { ProductionOrderInterface } from '../../../interfaces/production_order'

import Constants from '../../../utils/constants'

export const operationalActions = {

    SET_COST: 'SET_COST',
    SET_SELECTED_ORDER: 'SET_SELECTED_ORDER',
    GET_PRODUCTIONS_ORDERS: 'GET_PRODUCTIONS_ORDERS',
    SET_OPTIONS: 'SET_OPTIONS',
    SET_PRODUCTION_ORDERS: 'SET_PRODUCTION_ORDERS',
}

export const fetchProductionOrders = () => {

    const orders: Promise<ProductionOrderInterface[]> = axios.get(`${Constants.Sales_API.address}${Constants.Sales_API.routes.Pedidos}`)
    .then((response) => response.data)
    .catch((error) => { console.log(error); return [{ id: 1, quantidade: 25000, dataPedido: '', cliente: 'Qualquer' }] })

    return orders
}

export const createOptionsProductionOrder = (options: ProductionOrderInterface[]): OptionInterface[] => {

    return map(options, (option: ProductionOrderInterface) => {

        const new_option: OptionInterface = {
            label: option.id.toString(),
            value: option.id
        }

        return new_option
    })
}

export const setOptions = (options: OptionInterface[]) => ({
    type: operationalActions.SET_OPTIONS,
    payload: options
})

export const setProductionOrders = (orders: ProductionOrderInterface[]) => ({

    type: operationalActions.SET_PRODUCTION_ORDERS,
    payload: orders
})


export const fetchCostRawMaterial = () => {

    const value: Promise<number> = axios.get(`${Constants.Financial_API.address}${Constants.Financial_API.routes.CustoMateriaPrima}`)
    .then((response) => response.data)
    .catch((error) => { console.log(error); return 0 })

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