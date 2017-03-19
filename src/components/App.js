import React from 'react';
import axios from 'axios';

import Feed from './Feed';

export default class App extends React.Component {

    constructor (props){
        super(props);
        this.state = {
           feeds: []
        };
    }

    componentDidMount() {
        const rssUrl = '/res';
        axios.get(rssUrl)
            .then(res => {
                const feeds = res.data.rss.channel[0].item;
                console.log('++++++++++++++++++++++++++++++++++');
                console.log(feeds);
                console.log('++++++++++++++++++++++++++++++++++');
                this.setState({ feeds });
            });
    }

    render() {
        return(
            <div>
                {
                    this.state.feeds.map((feed, index) => {
                        return <Feed
                            key = {index}
                            link = {feed.link[0]}
                            title={feed.title[0]}
                            date={feed.pubDate[0]}
                            description={feed.description[0]}
                            imgUrl={feed.enclosure[0].$.url}
                        />
                    })
                }
            </div>
        )
    }
}
