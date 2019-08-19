import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'

function Header() {

    const [toggle, setToggle] = useState(false)

    const openCloseToggle = () => {
        setToggle(!toggle)
    }

    return(
        <div>
            <Navbar color="dark" dark expand="md">
                <div className='container'>
                    <NavbarBrand tag={Link} to='/' className='mt-3 mb-3'>Minhas Séries</NavbarBrand>
                    <NavbarToggler onClick={openCloseToggle} />
                    <Collapse isOpen={toggle} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to='/'>Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to='/series'>Séries</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to='/genres'>Gêneros</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        </div>
    )

}

export default Header