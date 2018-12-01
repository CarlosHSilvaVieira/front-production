import * as React from 'react'
import { Form, FormControl, FormGroup, Label } from 'react-bootstrap'
import { map } from 'lodash'
import { OptionInterface } from '../../interfaces/option'

import connect from './connect'

interface PropTypes {

    control_id: string
    label: string
    options: OptionInterface<any>[]

    // Functions
    handleSelect: any
    fetchOptions: any
}

class Select extends React.Component<PropTypes, any> {

    constructor(props: PropTypes) {
        super(props)

        this.handleSelect = this.handleSelect.bind(this)
    }

    componentWillMount() {

        this.props.fetchOptions()
    }

    handleSelect(value: any) {

        this.props.handleSelect(value)
    }

    renderOptions() {

        if (this.props.options) {

            return map(this.props.options, (option: OptionInterface<any>) => {

                return (
                    <option value={option.value}>{option.label}</option>
                )
            })
        }

        return []
    }

    render() {

        return (
            <FormGroup controlId={this.props.control_id}>
                <Label>
                    {this.props.label}
                </Label>
                <FormControl componentClass="select" placeholder="select" onChange={this.handleSelect}>
                    <option value={0}>Selecione a ordem</option>
                    <option value={3000}>1</option>
                    <option value={1000}>2</option>
                    {this.renderOptions()}
                </FormControl>
            </FormGroup>
        )
    }
}

export default connect(Select)