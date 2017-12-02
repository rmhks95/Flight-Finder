//Contains all Front end components made using React 
// To see JSON data enter /Home/Flights?From=(Abbrv. of airport)&To=(Abbrv. of airport)

/**
*Header object
*
*/
var Header = React.createClass({

    //Displays header, link to JSON display of objects, and SearchBox
    render: function () {
        return (
            <div className="overall">
                <h1>Flight Finder</h1>
                <p />
                <SearchBox />
            </div>
        );
    }
});



/**
*Makes the top div that contains the To and From and the sumbit button
*
*/
var SearchBox = React.createClass({

    //Initializes all objects to empty 
    getInitialState: function () {
        return {
            From: "",
            To: "",
            flight: []
        };

    },

    //Sets state of object when it was changes
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    },

    //Will contact server side to select what flights are wanted
    findFlights(num) {
        $.ajax({
            url: "/Home/Flights?From=" + this.state.From + "&To=" + this.state.To + "&Sort=".concat(num),
            dataType: 'json',
            success: function (data) {
                this.setState({
                    flight: data
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

    },

    //Sets the From variable when returned
    handleFrom(data) {
        this.setState({
            From: data
        })
    },

    //Sets the To variable when returned
    handleTo(data) {
        this.setState({
            To: data
        })
    },


    //Runs the From and To Components and displays submit button 
    render: function () {
        return (
            <div>
                <From handlefrom={this.handleFrom} url="/Home/Airports" id='from' />
                <p />
                <To handleto={this.handleTo} id='to' url="/Home/Airports" />
                <p />
                <button onClick={this.findFlights}>Submit</button>

                <TableEntries handlesort={this.findFlights} flight={this.state.flight} />
            </div>
        );

    }
});



/**
*Makes From object which selects all the airports from server
*
*/
var From = React.createClass({

    //Initializes all objects to empty
    getInitialState: function () {
        return {
            Airport: [],
            selected: ''
        };
        this.handleChange = this.handleChange.bind(this);
    },


    //Pulls airport JSON from server and sets it to Airport array
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

    //When an airport is selected it changes variable
    handleChange(event) {
        this.props.handlefrom(event.target.value)
        this.setState({
            selected: event.target.value
        });


    },

    //Creates select object from Airport array
    render: function () {

        return (

            <div>
                <br /><label> From:</label>
                <select id="selected" defaultValue onChange={this.handleChange}>
                    <option disabled value> -- select an option -- </option>
                    {
                        this.state.Airport.map(function (item, key) {

                            var combo = (item[0].Value + " - " + item[1].Value);

                            return (

                                <option id='selected' value={combo} key={key}>{combo}</option>
                            )
                        }.bind(this))
                    };
                </select><br />
            </div>)


    }
})



/**
*Makes To object which selects all the airports from server
*
*/
var To = React.createClass({

    //Initializes all objects to empty 
    getInitialState: function () {
        return {
            Airport: [],
            selected: ''
        };
        this.handleChange = this.handleChange.bind(this);
    },

    //Pulls airports JSON from server and sets it to Airport array
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

    //When an airport is selected it changes variable 
    handleChange(event) {
        this.props.handleto(event.target.value)
        this.setState({
            selected: event.target.value
        });

    },

    //Creates select object from Airport array
    render: function () {

        return (
            <div><br /><label> To:</label>
                <select id="selected" defaultValue onChange={this.handleChange} required>
                    <option disabled value> -- select an option -- </option>
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



/**
*Makes TableEntries object which displays flights
*
*/
var TableEntries = React.createClass({

    //Initializes variables to empty 
    getInitialState: function () {
        return {
            flight: this.props.flight,
            sort: ''
        };
        this.handleChange = this.handleChange.bind(this)
    },
    

    //When an sort is selected it changes variable 
    handleChange(event) {
        this.props.handlesort(event.target.value)
        this.setState({
            sort: event.target.value
        });
        

    },

    //Creates table from Flight array with headers and view selector
    render: function () {
        return (
            <div>
                <label>Sort by:</label>

                <select defaultValue onChange={this.handleChange}>
                    <option value="0">First Class Price</option>
                    <option value="1">Main Cabin Price</option>
                    <option value="2" value>Departure Time</option>
                </select>


                <table>
                    <tbody>
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
                        this.props.flight.map(function (item, key) {
                            return (
                                <tr key={key} >
                                    <td> {item[0].Value} </td>
                                    <td> {item[1].Value} </td>
                                    <td> {item[2].Value} </td>
                                    <td> {item[3].Value} </td>
                                    <td> {item[4].Value} </td>
                                    <td> ${item[5].Value} </td>
                                    <td> ${item[6].Value} </td>
                                </tr>)
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
});

/**
*Starts ReactDOM and sends to Header object
*
*/
ReactDOM.render(
    <Header />,
    document.getElementById('content')
); 
