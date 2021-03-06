import React, {Component} from "react"
import {reduxForm, Field} from "redux-form"
import {compose} from "redux"
import {connect} from "react-redux"
import * as actions from "../../actions"

class Signin extends Component {

    onSubmit = (formProps) => {
        this.props.signin(formProps, () => {
            this.props.history.push("/feature");
        })
    }

    render(){
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
            <h3>Sign in</h3>
                <fieldset>Email
                <Field
                    name="email"
                    type="text"
                    component="input"
                    autoComplete="none"
                />
                </fieldset>
           
                <fieldset>Password
                <Field
                    name="password"
                    type="password"
                    component="input"
                    autoComplete="none"
                />
                </fieldset>
                <div>{this.props.errorMessage}</div>
                <button>OK</button>
            </form>
        )
    }
}

function mapStateToProps(state){
    return{ errorMessage: state.auth.errorMessage };
}
export default compose(
    connect(mapStateToProps, actions), 
    reduxForm({form:"signin"})
)(Signin)