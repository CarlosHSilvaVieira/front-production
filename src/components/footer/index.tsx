import * as React from 'react'
import { Navbar } from 'react-bootstrap'

class MyFooter extends React.Component {

    render() {
        return(
            <Navbar fixedBottom={true} color={'dark'}>
                <Navbar.Brand href={'/home'}>Production System</Navbar.Brand>
                <Navbar.Collapse>
                    <Navbar.Text>
                        Desenvolvido
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default MyFooter