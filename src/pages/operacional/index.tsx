// --strictNullChecks

import * as React from 'react'

import { find } from 'lodash'
import { Form, Modal, Label } from 'react-bootstrap'

import Header from '../../components/header'
import Footer from '../../components/footer'
import Select from '../../components/select'
import Card from '../../components/card/default'
import BarChart from '../../components/charts/bar'

import './style.css'

import { OptionInterface } from '../../interfaces/option'
import { ProductionOrderInterface } from '../../interfaces/production_order'

import { format } from 'date-fns'

import connect from './connect'

interface PropTypes {

    cost_raw_material: number,
    selected_order: ProductionOrderInterface,
    options: OptionInterface[],
    production_orders: ProductionOrderInterface[],
    stock: number

    // Functions
    fetchCostRawMaterial: any,
    setSelectedOrder: any,
    fetchOptions: any,
    getStock: any,
}

class OperacionalPage extends React.Component<PropTypes, any> {

    constructor(props: PropTypes) {
        super(props)

        this.state = {
            data: [],
        }

        this.handleSelect = this.handleSelect.bind(this)
    }

    componentWillMount() {
        this.props.fetchCostRawMaterial()
        this.props.fetchOptions()
        this.props.getStock()
    }

    handleSelect(event: any) {

        if (this.props.production_orders.length) {

            const production_order = find(this.props.production_orders, (prod: ProductionOrderInterface, index: number) => {

                if (prod.IdPedido === Number(event.target.value)) {

                    return prod
                }
            })

            this.props.setSelectedOrder(production_order)
        }
    }

    componentWillReceiveProps(next: PropTypes) {

        if (next.stock && next.selected_order) {

            this.setState({ data: [{ name: next.selected_order.IdPedido, estoque: next.stock, quantidade: next.selected_order.quantidade }] })
        }
    }

    processQuant() {

        if (!this.props.selected_order) { return [] }

        console.log(this.props.stock)

        return [{ name: this.props.selected_order.IdPedido, estoque: this.props.stock, quantidade: this.props.selected_order.quantidade }]
    }

    render() {
        return (
            <div>
                <Header />
                <div className={'container'}>
                    <div>
                        <div className={'form'}>
                            <h3>Disponibilidade de recursos no estoque para produção</h3>
                            <Form>
                                <Select
                                    label={'Ordem de produção'}
                                    control_id={''}
                                    handleSelect={this.handleSelect}
                                    options={this.props.options}
                                />
                            </Form>
                        </div>
                        <div className={'chart'}>
                            <div>
                                <Card header={'Detalhes da Ordem de Produção'}>
                                    <p>
                                        <span>id: </span>
                                        <span>{this.props.selected_order ? this.props.selected_order.IdPedido : ''}</span>
                                    </p>
                                    <p>
                                        <span>quantidade: </span>
                                        <span>{this.props.selected_order ? this.props.selected_order.quantidade : ''}</span>
                                    </p>
                                    <p>
                                        <span>data: </span>
                                        <span>{this.props.selected_order ? format(new Date(this.props.selected_order.dataPedido), 'dd/MM/yyyy') : ''}</span>
                                    </p>
                                    <p>
                                        <span>cliente: </span>
                                        <span>{this.props.selected_order ? this.props.selected_order.cliente : ''}</span>
                                    </p>
                                    <p>
                                        <span>Custo de produção: </span>
                                        <span>{this.props.fetchCostRawMaterial && this.props.selected_order ?
                                            Math.abs(this.props.selected_order.quantidade * this.props.cost_raw_material).toFixed(2)
                                            : ''}
                                        </span>
                                    </p>
                                </Card>
                            </div>
                            <BarChart
                                width={500}
                                heigth={500}
                                xname={'quant'}
                                data_key={[{
                                    key: 'estoque', color: 'blue',
                                }, { key: 'quantidade', color: 'red' }]}
                                data={this.state.data}
                            />
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        )
    }
}

export default connect(OperacionalPage)
