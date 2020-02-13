import React,{Component} from 'react'
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink} from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from '../../actions/authActions'

import {clearErrors} from '../../actions/errorActions'

class LoginModal extends Component{
    state = {
        modal: false,
        email: '',
        password: '',
        msg: ''

    }

    

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const {error, isAuthenticated} = this.props
        if(error !== prevProps.error){
            if(error.id === 'LOGIN_FAIL'){
                this.setState({msg: error.msg.message})
    
            }else{
                this.setState({msg: null})
            }
        }

        if(this.state.modal){
            if(isAuthenticated){
               // this.toggle()
               var modal = document.getElementById("myLogin");
               modal.style.display = "none";
            }

        }

    }

    toggle = () => {
        this.props.clearErrors()
        this.setState({
            modal: !this.setState.modal
        })

    
    }

    

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const {email, password} = this.state

        const user = {
            email,
            password
        }

        this.props.login(user)

        

    }

    render(){
        return(
            <div>

                <NavLink id="login" onClick={this.toggle} href="#">Login</NavLink> 
                    

                <div id="myLogin" className="modal">

                <div className="modal-content">
                    <span className="closeLogin">&times;</span>
                    {this.state.msg ? (<span class="alert">{this.state.msg}</span>) :null}
                    <form onSubmit={this.handleSubmit} >
                            
                                
                                <label htmlFor="email">Email</label>
                                <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                onChange={this.onChange}
                                />
                                <label htmlFor="password">Password</label>
                                <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                onChange={this.onChange}
                                />
                                <button>Login</button>
                        </form>
                </div>

                </div>
                
                
                 {/* <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                     <Form onSubmit={this.handleSubmit} >
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
                                onChange={this.onChange}
                                />
                                <Label for="email">Email</Label>
                                <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                onChange={this.onChange}
                                />
                                <Label for="password">Password</Label>
                                <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                onChange={this.onChange}
                                />
                                <Button
                                color="dark"
                                style={{marginBottom: '2rem'}} block
                                >Register</Button>
                            </FormGroup>
                        </Form>
                        
                    </ModalBody>

                </Modal>  */}
            </div>
        )
    }

}



const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps,{login, clearErrors})(LoginModal)