import React, {Component, Fragment} from 'react'
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import RegisterModal from '../components/auth/RegisterModal'
import LoginModal from '../components/auth/LoginModal'
import Logout from '../components/auth/Logout'

class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        
    }

    toggle = () => {
        this.setState({
            isOpen: !this.setState.isOpen
        })
    
    }

    render(){

        const {isAuthenticated} = this.props.auth

        const authLinks = (
            <Fragment>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        )

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                 
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        )


        return(
            <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">ShoppingList</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {isAuthenticated ? authLinks : guestLinks}
                        </Nav>
                    </Collapse>
                </Container>

            </Navbar>
        </div>
        )
        
    }

}

const mapStateToProps = (state) => ({
    auth: state.auth
    
})

export default connect(mapStateToProps, null)(AppNavbar)