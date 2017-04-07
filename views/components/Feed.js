import React from 'react';

class Feed extends React.Component {

    postTime (date) {
        let q = new Date() - date;
        let postTime = q/(1000 * 60);
        if (postTime < 60) {
            return postTime.toFixed() + " мин"
        }
        else if ((postTime / 60) < 24) {
            postTime /=  60;
            return postTime.toFixed() + " ч"
        } else {
            postTime /=  (60 * 24);
            return postTime.toFixed() + " д"
        }
    }

    render(){
        let date = new Date(this.props.date);
        let isImage = true;
        if (this.props.imgUrl === ""){
            isImage = false
        }
        return(
            <div className="row feed">
                {isImage && <img className="col-md-3 col-sm-3 col-xs-12" src={this.props.imgUrl} alt=""/>}
                <div className="col-md-9 col-sm-9 col-xs-12">
                    <h3><a href={this.props.link}>{this.props.title}</a></h3>
                    <div>Опубликовано: <span className="badge">{this.postTime(date)}</span> назад</div>
                    <div>{date.toLocaleString("ru")}</div>
                    <div>{this.props.description}</div>
                </div>
            </div>
        )
    }
}

module.exports = Feed;
