import React from 'react';

class Error extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.message}</h1>
                <h2>{this.props.error.status}</h2>
                <p>{this.props.error.stack}</p>
            </div>
        );
    }
}

module.exports = Error;





