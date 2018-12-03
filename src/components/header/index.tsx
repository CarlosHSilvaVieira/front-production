import * as React from 'react'

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

class MyHeader extends React.Component {

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#brand">Sistema de Produção</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="/">Operacional</NavItem>
                    <NavItem eventKey={2} href="/tatico">Tático</NavItem>
                    <NavItem eventKey={2} href="/estrategico">Estratégico</NavItem>
                </Nav>
            </Navbar>
        )
    }
}

/*
<Link href={'/operacional'}>Operacional</Link>
                        <Nav.link href={'/tatico'}>Tático</Nav.link>
                        <Nav.link href={'/estrategico'}>Estratégico</Nav.link>
*/

export default MyHeader