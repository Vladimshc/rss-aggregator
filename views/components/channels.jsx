import React from 'react';

class Chanels extends React.Component {
    render () {
        return (
            <li className="row list-group-item"  title={this.props.url}>

                <span className="col-xs-10 col-sm-10 col-md-10 chanel"  onClick={this.props.onClick}>{this.props.title}</span>
                <span className="col-xs-1 col-sm-1 col-md-1
                                    glyphicon glyphicon-remove-circle" aria-hidden="true"
                      onClick={this.props.delChannel}></span>
            </li>
        )
    }
}

module.exports = Chanels;

