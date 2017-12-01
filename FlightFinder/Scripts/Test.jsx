

var SearchBox= React.createClass({
    getInitialState: function () {
        return {
            From: "",
            To: "",
            fromChild: ''
        };
        this.handleData = this.handleData.bind(this);
    },

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    },


    findFlights() {

    },

    handleData(data) {
        this.setState({
            From: data
        })
    },

    render: function () {
        console.log(this.state.From + ", " + this.state.To);
        
        return (
            <div>
                <From handle={this.handleData} id='from' url="/Home/Airports" />
                <p />
                <To id='to' url="/Home/Airports" />
                <p />
                <button onClick={this.findFlights}>Submit</button>
                <TableEntries url="/Home/Flights" />
                
            </div>
        );
        
    }
});

var To = React.createClass({
    getInitialState: function () {
        return {
            Airport: [],
            selected: ''
        };
        this.handleChange = this.handleChange.bind(this);
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (data) {
                this.setState({
                    Airport: data
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    handleChange(event) {
        this.setState({
            selected : event.target.value
        });
        
    },

    render: function () {
        $(document).ready(function () {
            $('.airport').select2();
        });

        console.log(this.state.selected);
        return (
            <div><br /><label> To:</label>
                <select id="selected" onChange={this.handleChange} >
                    <option disabled selected value> -- select an option -- </option>
                    {
                        this.state.Airport.map(function (item, key) {
                            
                            var combo = (item[0].Value + " - " + item[1].Value);
                            
                            return (

                                <option id='selected' value={combo} key={key}>{combo}</option>
                            )
                        }.bind(this))
                    };
            </select><br /></div>)
        
            
    }
})

var From = React.createClass({
    getInitialState: function () {
        return {
            Airport: [],
            selected: ''
        };
        this.handleChange = this.handleChange.bind(this);
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (data) {
                this.setState({
                    Airport: data
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    handleChange(event) {
        this.setState({
            selected: event.target.value
        });

        this.props.From(this.state.selected)

    },

    render: function () {
        $(document).ready(function () {
            $('.airport').select2();
        });

        console.log(this.state.selected);
        return (
            <div><br /><label> From:</label>
                <select id="selected" onChange={this.handleChange} >
                    <option disabled selected value> -- select an option -- </option>
                    {
                        this.state.Airport.map(function (item, key) {

                            var combo = (item[0].Value + " - " + item[1].Value);

                            return (

                                <option id='selected' value={combo} key={key}>{combo}</option>
                            )
                        }.bind(this))
                    };
            </select><br /></div>)


    }
})


var TableEntries = React.createClass({
    getInitialState: function () {
        return {
            Flight: []
        };
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (data) {
                this.setState({
                    Flight: data
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return (<table>
            <tr>
                <th>To</th>
                <th>From</th>
                <th>Flight Number</th>
                <th>Departs</th>
                <th>Arrives</th>
                <th>Main Cabin Price</th>
                <th>First Class Price</th>
            </tr>
            {
            this.state.Flight.map(function (item, key) {
                return ( <tr key={
                    key
                } > <td> {
                    item[0].Value
                } </td> <td > {
                    item[1].Value
                } </td> <td > {
                    item[2].Value
                } </td> <td > {
                    item[3].Value
                } </td> <td > {
                    item[4].Value
                } </td> <td > {
                    item[5].Value
                } </td> <td > {
                    item[6].Value
                } </td> </tr>)
            })
        } </table>);
    }
});






var Header = React.createClass({
    render: function () {
        return (
            <div className="commentBox">
                <h1>Flights</h1>
                <a href="/json"> JSON Display</a>
                <p/>
                <SearchBox />
            </div>
        );
    }
});

ReactDOM.render(
    <Header />,
    document.getElementById('content')
); 