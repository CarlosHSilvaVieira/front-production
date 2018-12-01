// --strictNullChecks

import * as React from 'react'

import { Form } from 'react-bootstrap'

import Header from '../../components/header'
import Footer from '../../components/footer'
import Select from '../../components/select'
import BarChart from '../../components/charts/bar'

import './style.css'

import { OptionInterface } from '../../interfaces/option'
import { StockInterface } from '../../interfaces/stock'
import { ProductionOrderInterface } from '../../interfaces/production_order';

import connect from './connect'

interface PropTypes {

    cost_raw_material: number,
    order: any

    fetchCostRawMaterial: any,
    setSelectedOrder: any,
}

class OperacionalPage extends React.Component<PropTypes, any> {

    constructor(props: PropTypes) {
        super(props)

        this.state = {
            selected_value: { id: 1, quantidade: 25000 },
        }

        this.handleSelect = this.handleSelect.bind(this)
    }

    componentWillMount() {
        this.props.fetchCostRawMaterial()
    }

    handleSelect(event: any) {
        this.props.setSelectedOrder(event.target.value)
    }

    processQuant() {
        return [{ name: this.state.selected_value.id, st: 2000, or: this.props.order }]
    }

    render() {
        return (
            <div>
                <Header />
                <div>
                    <Form>
                        <Select
                            label={'Ordem de produção'}
                            control_id={''}
                            handleSelect={this.handleSelect}
                        />
                    </Form>
                    <BarChart
                        width={500}
                        heigth={500}
                        xname={'quant'}
                        data_key={[{
                            key: 'st', color: 'blue',
                        }, { key: 'or', color: 'red' }]}
                        data={this.processQuant()}
                    />
                </div>
                <Footer />
            </div>
        )
    }
}

export default connect(OperacionalPage)