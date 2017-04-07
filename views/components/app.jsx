import React, { Component } from 'react';
import axios from 'axios';


import Header from "./header.jsx";
import Channels from "./channels.jsx";
import Feed from "./Feed";

class App extends Component {

    constructor (props){
        super(props);
        this.handlerUrl = this.handlerUrl.bind(this);
        this.addChanel = this.addChanel.bind(this);
        this.getUser = this.getUser.bind(this);

        this.state = {
            showPreloader: false,
            addChanel: false,
            renderFeeds: false,

            chanelUrl: 'https://dou.ua/feed/',
            chanelTitle: "",
            feeds: [],
            siteLink: '',
            channels: [
                {
                    url: 'http://news.liga.net/all/rss.xml',
                    title: 'Новости Украины 24 часа в сутки : ЛІГАБізнесІнформ'
                }
            ]

        };
    }

    componentDidMount() {
        this.getUser();
    }

    getUser() {
        axios.post('/home')
            .then(res => {
                if (res.data.user !== undefined){
                    this.setState({ user: res.data.user });
                    this.setState({ channels: res.data.user.userChannel });
                    this.setState({ renderFeeds: true })
                }
            });
    }

    getDataRss(chanelUrl) {
        const rssUrl = '/api/feed-url?feedUrl=' + chanelUrl;
        axios.get(rssUrl)
            .then(res => {
                    const feeds = res.data.rss.channel[0].item;
                    const chanelTitle = res.data.rss.channel[0].title;
                    const siteLink = res.data.rss.channel[0].link[0];
                    const siteDescription = res.data.rss.channel[0].description[0];
                    console.log('++++++++++++++++++++++++++++++++++');
                    console.log(res.data);
                    console.log('++++++++++++++++++++++++++++++++++');
                    this.setState({ feeds });
                    this.setState({ showPreloader: false });
                    this.setState({ chanelTitle });
                    this.setState({ siteLink });
                    this.setState({ siteDescription });
                }
            );
    }

    addChanel(){
        if (this.state.chanelUrl !== "" && this.state.chanelTitle !== "" && this.state.addChanel ){
            let channels = [];
            let channel = {};
            channels = this.state.channels;
            channel.url = this.state.chanelUrl;
            channel.title = this.state.chanelTitle.toString();
            channels.push(channel);
            this.setState({channels});
            this.state.chanelTitle = "";
            this.state.addChanel = false;
            if (this.state.user !== undefined){
                let user = this.state.user;
                user.userChannel = channels;
                this.setState({user});
                axios.post('/update',
                    {
                        user: this.state.user
                    }
                )
                    .then(res => {
                        console.log(res)
                    });
            }
        }
    };

    handlerUrl(event) {
        event.preventDefault();
        const chanelUrl = event.target.input.value;
        if (chanelUrl !== ""){
            console.log("-----handlerUrl-----");
            console.log(chanelUrl);
            this.setState({chanelUrl});
            event.target.input.value = "";
            this.getDataRss(chanelUrl);
            this.setState({addChanel: true});
            this.setState({renderFeeds: false,});
        }
    }

    _onSelectUrl(chanelUrl) {
        console.log(chanelUrl);
        this.setState({showPreloader: true});
        this.setState({chanelUrl});
        this.setState({renderFeeds: true});
        this.getDataRss(chanelUrl);
    }

    _delChannel(index){
        let channels = this.state.channels;
        channels.splice(index, 1);
        this.setState({channels: channels});
        console.log(index);
        if (this.state.user.username !== undefined){
            let user = this.state.user;
            user.userChannel = channels;
            this.setState({user});
            axios.post('/update',
                {
                    user: this.state.user
                }
            )
                .then(res => {
                    console.log(res)
                });
        }
    }

    render() {
        return (
            <div>
                <Header handlerUrl = {this.handlerUrl} user = {this.state.user}/>
                <div className="container">
                    <div className="col-md-3">
                        <ul className="list-group">
                            {
                                this.state.channels.map((chanel, index) => {
                                    return (
                                        <Channels
                                            key={index}
                                            url={chanel.url}
                                            title={chanel.title}
                                            onClick = {this._onSelectUrl.bind(this, chanel.url)}
                                            delChannel = {this._delChannel.bind(this, index)}
                                        />
                                    )
                                })
                            }

                        </ul>

                    </div>
                    <div className="col-md-9">
                        {
                            this.state.showPreloader &&
                                <img className="preloader text-center" src="images/loading6_230x230-cooler.gif"/>
                        }

                        {
                            this.state.addChanel &&
                                <div>
                                    <h2>{this.state.chanelTitle}</h2>
                                    <a>{this.state.siteLink}</a>
                                    <p>{this.state.siteDescription}</p>
                                    <button onClick={this.addChanel}>Add Chanel</button>
                                </div>
                        }

                        {
                            this.state.renderFeeds && <div>
                                <h1><a href={this.state.siteLink} title={this.state.chanelUrl}>{this.state.chanelTitle}</a></h1>
                                {
                                    this.state.feeds.map((feed, index) => {
                                        let imgUrl = (feed.enclosure) ? feed.enclosure[0].$.url : '';
                                        let description = (feed.description[0].replace(/<[^>]+>/g,''));
                                        return <Feed
                                            key = {index}
                                            link = {feed.link[0]}
                                            title = {feed.title[0]}
                                            date = {feed.pubDate[0]}
                                            description = {description}
                                            imgUrl = {imgUrl}
                                        />
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default App;