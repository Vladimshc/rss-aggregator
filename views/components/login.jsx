import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
    render() {
        return (
            <div className="login-page-content ">
                <div className="container login-page">
                    <div className="row">
                        <div className="col-sm-6 col-md-4 col-md-offset-4">
                            <h1 className="text-center login-title">Sign in to you rss aggregator</h1>
                            <div className="signup-wall">
                                <img className='profile-img text-center' src='images/photo.png?sz=120' alt="avatar"/>
                                <form className='form-signin' action='/login' method='POST'>
                                    <input type='text' name='username' className='form-control' placeholder='Username' required autoFocus />
                                    <input type='password' name='password' className='form-control' placeholder='Password' required/>
                                    <button className='btn btn-lg btn-primary btn-block' type='submit'> Sign in </button>
                                    <span className="clearfix">
                                        <Link to="/register" className='text-center new-account'>Create an account</Link>
                                    </span>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;
