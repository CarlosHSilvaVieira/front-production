import * as React from 'react'

import { map } from 'lodash'

import { BarChart, CartesianGrid, Legend, XAxis, YAxis, Tooltip, Bar } from 'recharts'

interface PropTypes {

    width: number
    heigth: number
    data: any[]
    xname: string
    data_key: { key: string, color: string, stackId: string | null }[]
}

class MyBarChart extends React.Component<PropTypes, any> {


    renderBars() {

        if (this.props.data_key.length) {

            return map(this.props.data_key, (data_key: { key: string, color: string, stackId: string }, index: number) => {

                return (
                    <Bar key={index} stackId={data_key.stackId} dataKey={data_key.key} fill={data_key.color} />
                )
            })
        }

        return null
    }

    render() {

        return (
            <BarChart
                width={this.props.width}
                height={this.props.heigth}
                data={this.props.data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <XAxis dataKey={this.props.xname} />
                <YAxis />
                <Tooltip />
                <Legend />

                {this.renderBars()}
            </BarChart>
        )
    }
}

export default MyBarChart
