import React,{Component} from 'react'
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink} from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {register} from '../../actions/authActions'
import {clearErrors} from '../../actions/errorActions'

class RegisterModal extends Component{
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: ''

    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const {error, isAuthenticated} = this.props
        if(error !== prevProps.error){
            if(error.id === 'REGISTER_FAIL'){
                this.setState({msg: error.msg.message})
    
            }else{
                this.setState({msg: null})
            }
        }

        if(this.state.modal){
            if(isAuthenticated){
               // this.toggle()
               var modal = document.getElementById("myModal");
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

        const {name, email, password} = this.state

        const newUser = {name, email, password}

        this.props.register(newUser)

        this.toggle()

    }

    render(){
        return(
            <div>

                <NavLink id="myBtn" onClick={this.toggle} href="#">Register</NavLink> 


                <div id="myModal" className="modal">

                <div className="modal-content">
                    <span className="close">&times;</span>
                    {this.state.msg ? (<span class="alert">{this.state.msg}</span>) :null}
                    <form onSubmit={this.handleSubmit} >
                            
                                <label htmlFor="name">Name</label>
                                <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
                                onChange={this.onChange}
                                />
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
                                <button
                                
                                >Register</button>
                        </form>
                </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps,{register, clearErrors})(RegisterModal)