import React, { Component } from 'react';

class Register extends Component {
    render() {
        return (
            <div className="container login-page-content">
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-md-offset-4">
                        <h1 className="text-center login-title">Registration Details
                            <div className="signup-wall">
                                <form action="/signup" method="POST" className="form-signin">
                                    <input type="text" name="username" placeholder="Username" required="required" autoFocus className="form-control"/>
                                    <input type="password" name="password" placeholder="Password" required="required" className="form-control"/>
                                    <input type="email" name="email" placeholder="Email" required="required" className="form-control"/>
                                    <button type="submit" className="btn btn-lg btn-primary btn-block">Register</button>
                                    <span className="clearfix"></span>
                                </form>
                            </div>
                            <div id="message">
                                <h1 className="text-center error-message">{this.props.message}</h1>
                            </div>
                        </h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;

