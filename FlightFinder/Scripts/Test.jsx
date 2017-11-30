

var SearchBox= React.createClass({
    getInitialState: function () {
        return {
            From: "",
            To: ""
        };
    },

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    },


    findFlights() {
        
        console.log("Here");
    },

    render: function () {
        console.log(this.state.From + ", " + this.state.To);
            
        return (
            <div>
                <input name="From" placeholder="From" value={this.state.From} onChange={this.handleChange}/>
                <p />
                <input name="To" placeholder="To" value={this.state.To} onChange={this.handleChange} />
                <p />
                <button onClick={this.findFlights}>Submit</button>
                < TableEntries url="/Home/Flights" />
            </div>
        );
        
    }
});


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