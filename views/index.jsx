import React from 'react';
import Footer from "./components/footer.jsx";

class Index extends React.Component {
    render() {
        return (
            <html>
            <head>
                <title>{this.props.title}</title>
                <link rel='stylesheet' href='/stylesheets/style.css'/>
                {/*<link rel='stylesheet' href='/stylesheets/bootstrap.min.css'/>*/}
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
            </head>
            <body>
                <div className="wrapper">
                    <div className="content">
                        <div id="app"/>
                        {this.props.message &&
                        <div className="container">
                            <div className="alert-danger text-center">{this.props.message}</div>
                        </div>
                        }
                    </div>
                    <Footer />
                 </div>

            <script src="./bundle.js"/>
            </body>
            </html>
        );
    }
}

module.exports = Index;