import * as React from 'react'

import { Form } from 'react-bootstrap'
import { addYears, getYear, getMonth, startOfYear, endOfYear, } from 'date-fns'
import { getMonthName, processProductionsOrders } from '../../redux/actions/pages/tactical'
import { forEach } from 'lodash'

import { OptionInterface } from '../../interfaces/option'
import { ProductionInterface } from '../../interfaces/production';
import { ProductionOrderInterface } from '../../interfaces/production_order';

import Header from '../../components/header'
import Footer from '../../components/footer'
import Select from '../../components/select'
import BarChart from '../../components/charts/barMix'

import connect from './connect'
import './style.css'


interface PropTypes {

    cost_raw_material: number,
    month: number,
    year: number,
    productions: ProductionInterface[],
    production_orders: ProductionOrderInterface[],
    data: any,
    // Functions

    fetchCostRawMaterial: any,
    fetchProdOrders: any,
    fetchProduction: any,
    setYear: any,
    setMonth: any,
    setData: any,
}

class TacticalPage extends React.Component<PropTypes, any> {


    constructor(props: PropTypes) {
        super(props)

        this.state = {
            range: { start: new Date(), end: addYears(new Date(), 2) }
        }

        this.handleSelectMonth = this.handleSelectMonth.bind(this)
        this.handleSelectYear = this.handleSelectYear.bind(this)
        this.makeRequests = this.makeRequests.bind(this)
    }

    componentWillReceiveProps(next: PropTypes) {

        if (this.props.production_orders !== next.production_orders || this.props.productions !== next.productions) {

            this.createData(next.productions, next.production_orders)
        }
    }

    processProductions(productions: ProductionInterface[]) {

        let manha: number = 0
        let tarde: number = 0
        let  noite: number = 0

        forEach(productions, (production: ProductionInterface, index: number) => {

            if (production.turno == 'Manhã') {

                manha += production.quantidade
            }
            else if (production.turno == 'Tarde') {

                tarde += production.quantidade
            }
            else if (production.turno == 'Noite') {

                noite += production.quantidade
            }
        })

        return {
            manha,
            tarde,
            noite
        }
    }

    createData(productions: ProductionInterface[], orders: ProductionOrderInterface[]) {

        const quant_orders: number = processProductionsOrders(orders)
        const quant_production: { manha: number, tarde: number, noite: number } = this.processProductions(productions)
        
        const data = [{ name: 'algo', manha: quant_production.manha, tarde: quant_production.tarde, noite: quant_production.noite,  total: quant_orders }]

        this.props.setData(data)
    }

    componentWillMount() {
        this.props.fetchCostRawMaterial()
    }

    createYearOptions() {

        const range: Interval = this.state.range
        const options: OptionInterface[] = []

        for (let index = getYear(range.start); index <= getYear(range.end); index++) {

            options.push({
                label: index.toString(),
                value: index
            })
        }

        return options
    }

    createMonthOprions() {

        const options: OptionInterface[] = []


        for (let index = 0; index <= 11; index++) {

            options.push({
                label: getMonthName(index),
                value: index
            })
        }

        return options
    }

    handleSelectMonth(event: any) {

        this.props.setMonth(event.target.value)
    }

    handleSelectYear(event: any) {

        this.props.setYear(event.target.value)
    }

    makeRequests() {
        
        this.props.fetchProdOrders(this.props.month, this.props.year)
        this.props.fetchProduction(this.props.month, this.props.year)
    }

    render() {

        return (
            <div>
                <Header />
                <div className={'container'}>
                    <div>
                        <div className={'form'}>
                            <h3>Relação do que foi produzido para o que foi requerido em um turno</h3>
                            <Form>
                                <Select
                                    label={'Mês'}
                                    control_id={'control_form'}
                                    handleSelect={this.handleSelectMonth}
                                    options={this.createMonthOprions()}
                                />
                                <Select
                                    label={'Ano'}
                                    control_id={'control_form'}
                                    handleSelect={this.handleSelectYear}
                                    options={this.createYearOptions()}
                                />
                            </Form>
                        </div>
                        <div className={'chart'}>
                            <BarChart
                                width={500}
                                heigth={500}
                                xname={''}
                                data_key={[
                                    { key: 'manha', color: 'blue', stackId: 'a' },
                                    { key: 'tarde', color: 'red', stackId: 'a' },
                                    { key: 'noite', color: 'green', stackId: 'a' },
                                    { key: 'total', color: 'yellow', stackId: null },
                                ]}
                                data={this.props.data}
                            />
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        )
    }
}

export default connect(TacticalPage)