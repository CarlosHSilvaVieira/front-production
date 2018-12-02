import * as React from 'react'

import './style.css'

interface PropTypes {

    header: string
}

class Card extends React.Component<PropTypes, any> {

    render() {

        return (
            <div id={'container'} className={'container_card'}>
                <div id={'content'} className={'content_card'}>
                    <div id={'header'} className={'header_card'}>
                        <h4>{this.props.header}</h4>
                    </div>
                    <div id={'body'} className={'body_card'}>
                        { this.props.children }
                    </div>
                </div>
            </div>
        )
    }
}

export default Card