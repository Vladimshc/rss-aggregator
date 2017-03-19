import React from 'react';

export default class Feed extends React.Component {

    render(){
        return(
            <div>
                <div><img src={this.props.imgUrl} alt="feed image" width="300" height="200"></img></div>
                <h3><a href={this.props.link}>{this.props.title}</a></h3>
                <div>{this.props.date}</div>
                <div>{this.props.description}</div>
                <hr/>
            </div>
        )
    }
}
