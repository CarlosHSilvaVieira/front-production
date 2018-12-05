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
    SET_STOCK: 'SET_STOCK',
}

export const fetchProductionOrders = async () => {

    const orders: Promise<ProductionOrderInterface[]> = await axios.get(`${Constants.Sales.address}${Constants.Sales.routes.Pedidos}`)
    .then((response) => response.data)
    .catch((error) => { console.log(error); return [] })

    return orders
}

export const getStock = () => {

    const orders: Promise<number> = axios.get(`${Constants.Production.address}${Constants.Production.routes.getEstoqueMP}`)
    .then((response) => response.data)
    .catch((error) => { console.log(error); return 0 })

    return orders
}

export const createOptionsProductionOrder = (options: ProductionOrderInterface[]): OptionInterface[] => {

    return map(options, (option: ProductionOrderInterface) => {

        const new_option: OptionInterface = {
            label: option.IdPedido.toString(),
            value: option.IdPedido,
        }

        return new_option
    })
}

export const setOptions = (options: OptionInterface[]) => ({
    type: operationalActions.SET_OPTIONS,
    payload: options,
})

export const setProductionOrders = (orders: ProductionOrderInterface[]) => ({

    type: operationalActions.SET_PRODUCTION_ORDERS,
    payload: orders,
})

export const fetchCostRawMaterial = () => {

    const value: Promise<number> = axios.get(`${Constants.Financial.address}${Constants.Financial.routes.CustoMateriaPrima}`)
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

export const setStock = (stock: number) => ({

    type: operationalActions.SET_STOCK,
    payload: stock,
})
