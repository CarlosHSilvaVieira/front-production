import * as React from 'react'
import { Form, FormControl, FormGroup, Label } from 'react-bootstrap'
import { map } from 'lodash'
import { OptionInterface } from '../../interfaces/option'

interface PropTypes {

    control_id: string
    label: string
    options: OptionInterface[]

    // Functions
    handleSelect: any
}

class Select extends React.Component<PropTypes, any> {

    constructor(props: PropTypes) {
        super(props)

        this.handleSelect = this.handleSelect.bind(this)
    }

    handleSelect(value: any) {

        this.props.handleSelect(value)
    }

    renderOptions() {

        if (this.props.options) {

            return map(this.props.options, (option: OptionInterface, index: number) => {

                return (
                    <option key={index} value={option.value}>{option.label}</option>
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
                    {this.renderOptions()}
                </FormControl>
            </FormGroup>
        )
    }
}

export default Select