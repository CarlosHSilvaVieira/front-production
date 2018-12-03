import axios from 'axios'
import { startOfMonth, endOfMonth, format } from 'date-fns'

import { map, forEach } from 'lodash'

import { OptionInterface } from './../../../interfaces/option'
import { ProductionOrderInterface } from '../../../interfaces/production_order'

import Constants from '../../../utils/constants'
import { ProductionInterface } from '../../../interfaces/production';

export const Months: string[] =  ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

export const tacticalActions = {
    SET_MONTH: 'SET_MONTH',
    SET_YEAR: 'SET_YEAR',
    SET_COST: 'SET_COST',
    SET_PRODUCTION: 'SET_PRODUCTION',
    SET_PRODUCTION_ORDERS: 'SET_PRODUCTION_ORDERS',
    SET_DATA: 'SET_DATA',
}

export const setData = (data: any) => ({

    type: tacticalActions.SET_DATA,
    payload: data,
})

export const setMonth = (month: number) => ({
    
    type: tacticalActions.SET_MONTH,
    payload: month,
})

export const setYear = (year: number) => ({
    
    type: tacticalActions.SET_YEAR,
    payload: year,
})

export const setCost = (cost: number) => ({
    
    type: tacticalActions.SET_COST,
    payload: cost,
})

export const setProduction = (production: (ProductionInterface | undefined)[]) => ({
    type: tacticalActions.SET_PRODUCTION,
    payload: production,
})

export const setProductionOrders = (orders: ProductionOrderInterface[]) => ({

    type: tacticalActions.SET_PRODUCTION_ORDERS,
    payload: orders,
})

export const fetchCostRawMaterial = () => {

    const value: Promise<number> = axios.get(`${Constants.Financial_API.address}${Constants.Financial_API.routes.CustoMateriaPrima}`)
    .then((response) => response.data)
    .catch((error) => { console.log(error); return 0 })

    return value
}

export const fetchProdOrders = (month: number, year: number) => {

    const start = startOfMonth(new Date(`${year}-${(month + 1)}-01`))
    const end = endOfMonth(new Date(`${year}-${(month + 1)}-01`))

    const value: Promise<ProductionOrderInterface[]> = axios.get(`${Constants.Sales_API.address}${Constants.Sales_API.routes.Pedidos}?${Constants.URL.inicio}=${start}&${Constants.URL.fim}=${end}`)
    .then((response) => response.data)
    .catch((error) => { console.log(error); return [] })

    return value
}

export const fetchProduction = (month: number, year: number) => {
    
    const { Production_API, URL } = Constants

    const month_name: string = getMonthName(month)

    const value: Promise<(ProductionInterface | undefined )[]> = axios.get(`${Production_API.address}${Production_API.routes.getAllProducaoPorMesTurno}`)
    .then((response) => getProductionByMonth(month_name, response.data))
    .catch((error) => { console.log(error); return [] })

    return value
}

export const getMonthName = (value: number): string => {

    let result: string = ''

    forEach(Months, (month: string, index: number) => {

        if (index == value) {

            result = month
            return false
        }
    })

    return result
}

export const processProductionsOrders = (production_orders: Array<ProductionOrderInterface>) => {

    let quant_total: number = 0

    forEach(production_orders, (order: ProductionOrderInterface, index: number) => {
        
        quant_total += order.quantidade
    })

    return quant_total
}

const getProductionByMonth = (month: string, productions: ProductionInterface[]): (ProductionInterface | undefined)[] => {

    const all: (ProductionInterface | undefined)[] = map(productions, (production: ProductionInterface, index: number) => {

        if (production.mes == month) {

            return production
        }
    })

    return all
}