"use strict";

var form = React.createClass({
    displayName: "form",
    render: function render() {
        return React.createElement(
            "div",
            { className: "col-md-12" },
            React.createElement(
                "div",
                { className: "item" },
                React.createElement(
                    "a",
                    { href: "", className: "title" },
                    React.createElement(
                        "h5",
                        null,
                        this.props.appitem.Title
                    )
                ),
                React.createElement(
                    "span",
                    { className: "author" },
                    "posted by ",
                    this.props.appitem.PostedBy
                ),
                React.createElement(
                    "span",
                    { className: "timeago" },
                    " on ",
                    this.props.appitem.Date
                )
            )
        );
    }
});

var eforum = React.createClass({
    displayName: "eforum",

    mixins: [ComponentVisibilityMixin],
    getInitialState: function getInitialState() {

        return {
            promodata: [{ "Title": "Nec vero sum nescius esse utilit in historia, non modo voluptatem nec vero sum nescius esse utilit in historia, non moda voluptatem.", "PostedBy": "Lim", "Date": " 30-12-2016  3:18pm" }, { "Title": "Nec vero sum nescius esse utilit in historia, non modo voluptatem nec vero sum nescius esse utilit in historia, non moda voluptatem.", "PostedBy": "Lim", "Date": "30-12-2016 3:20pm" }, { "Title": "Nec vero sum nescius esse utilit in historia, non modo voluptatem nec vero sum nescius esse utilit in historia, non moda voluptatem.", "PostedBy": "Lim", "Date": "30-12-2016 3:23pm" }]
        };
    },
    retrieveFromWebService: function retrieveFromWebService() {
        var that = this;
        var url = "/SiteAssets/eForum/sampledata2.js";
        fetch(url).then(function (response) {
            if (response.status >= 400) {
        console.log("error in server")
                throw new Error("no server");
            }
            return response.json();
        }).then(function (data) {
            that.setState({ promodata: data });
        });
    },
    componentVisibilityChanged: function componentVisibilityChanged() {
        this.retrieveFromWebService();
        this.disableVisibilityHandling();
    },
    renderPromotions: function renderPromotions() {
        return this.state.promodata.map(function (promoitem) {
            return React.createElement(form, { appitem: promoitem });
        });
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "col-md-12 col-sm-6 col-xs-6 latesttrendinggroupbox" },
            React.createElement(
                "div",
                { className: "latesttrendinggroup latest" },
                React.createElement(
                    "div",
                    { className: "col-md-12" },
                    React.createElement(
                        "h4",
                        { className: "subheader" },
                        "LATEST"
                    )
                ),
                this.renderPromotions()
            )
        );
    }
});
ReactDOM.render(React.createElement(eforum, null), document.getElementById('eforum'));