import { WorkedHours, EmployerInterface } from './../../../interfaces/employer'
import axios from 'axios'
import { startOfMonth, endOfMonth, format } from 'date-fns'

import { map, forEach, compact } from 'lodash'

import { ProductionOrderInterface } from '../../../interfaces/production_order'

import Constants from '../../../utils/constants'
import { ProductionInterface } from '../../../interfaces/production'

export const Months: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

export const tacticalActions = {
    SET_MONTH: 'SET_MONTH',
    SET_YEAR: 'SET_YEAR',
    SET_COST: 'SET_COST',
    SET_PRODUCTION: 'SET_PRODUCTION',
    SET_PRODUCTION_ORDERS: 'SET_PRODUCTION_ORDERS',
    SET_HOURS: 'SET_HOURS',
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

export const setProduction = (production: ProductionInterface[]) => ({
    type: tacticalActions.SET_PRODUCTION,
    payload: production,
})

export const setProductionOrders = (orders: ProductionOrderInterface[]) => ({

    type: tacticalActions.SET_PRODUCTION_ORDERS,
    payload: orders,
})

export const setTotalHours = (hours: number) => ({

    type: tacticalActions.SET_HOURS,
    payload: hours,
})

export const fetchCostRawMaterial = () => {

    const value: Promise<number> =
        axios.get(`${Constants.Financial_API.address}${Constants.Financial_API.routes.CustoMateriaPrima}`)
            .then((response) => response.data)
            .catch((error) => { console.log(error); return 0 })

    return value
}

export const fetchProdOrders = (month: number, year: number) => {

    const start = startOfMonth(new Date(year, month, 1)).toJSON()
    const end = endOfMonth(new Date(year, month, 1)).toJSON()

    console.log(start)
    console.log(end)

    const value: Promise<ProductionOrderInterface[]> =
        axios.get(`${Constants.Sales_API.address}${Constants.Sales_API.routes.Pedidos}?${Constants.URL.inicio}=${start}&${Constants.URL.fim}=${end}`)
            .then((response) => response.data)
            .catch((error) => { console.log(error); return [] })

    return value
}

export const fetchProduction = (month: number, year: number) => {

    const { Production, URL } = Constants

    const value: Promise<ProductionInterface[]> = axios.get(`${Production.address}${Production.routes.getAllProducaoPorMesTurno}`, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    })
        .then((response) => processProductionByMonth(month, response.data))
        .catch((error) => { console.log(error); return [] })

    return value
}

export const fetchHoursMonth = async (month: number) => {

    const retorno: WorkedHours[] = await axios.get(
        `${Constants.RH_API.address}${Constants.RH_API.routes.HorasTrabalhadas}/${Constants.URL.mes}/${month}`)
        .then((response) => response.data)
        .catch((error) => { console.log(error); return [] })

    return processWokedHours(retorno)
}

export const fetchEmployers = async (turno: string) => {

    const retorno: EmployerInterface[] = await axios.get(
        `${Constants.RH_API.address}${Constants.RH_API.routes.Funcionarios}/${Constants.URL.turno}=${turno}`)
        .then((response) => response.data)
        .catch((error) => { console.log(error); return [] })

    return retorno
}

export const getMonthName = (value: number): string => {

    let result: string = ''

    forEach(Months, (month: string, index: number) => {

        if (index === value) {

            result = month
            return false
        }
    })

    return result
}

export const processWokedHours = (worked: WorkedHours[]) => {

    let quant: number = 0

    forEach(worked, (work: WorkedHours, index: number) => {

        quant += Number(work.HorasTrabalhadasNoMes)
    })

    return quant
}

export const processProductionsOrders = (production_orders: ProductionOrderInterface[]) => {

    let quant_total: number = 0

    forEach(production_orders, (order: ProductionOrderInterface, index: number) => {

        quant_total += order.quantidade
    })

    return quant_total
}

export const processProductionByMonth = (month: number, productions: ProductionInterface[]): ProductionInterface[] => {

    const month_name: string = getMonthName(month)

    const all: ProductionInterface[] = map(productions, (production: ProductionInterface, index: number) => {

        if (production.mes === month_name) {

            return production
        }
    })

    return compact(all)
}
