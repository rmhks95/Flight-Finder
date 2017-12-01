//Contains all Front end components made using React 

/**
*Starts ReactDOM and sends to Header object
*
*/
ReactDOM.render(
    <Header />,
    document.getElementById('content')
); 



/**
*Header object
*
*/
var Header = React.createClass({

    //Displays header, link to JSON display of objects, and SearchBox
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
            fromChild: ''
        };
        this.handleData = this.handleData.bind(this);
    },

    //Sets state of object when it was changes
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    },

    //Will contact server side to select what flights are wanted
    findFlights() {

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
        console.log(this.state.From + ", " + this.state.To);
        
        return (
            <div>
                <From handle={this.handleFrom} id='from' url="/Home/Airports" />
                <p />
                <To handle={this.handleTo} id='to' url="/Home/Airports" />
                <p />
                <button onClick={this.findFlights}>Submit</button>
                <TableEntries url="/Home/Flights" />
                
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
        this.setState({
            selected: event.target.value
        });


    },

    //Creates select object from Airport array
    render: function () {
        $(document).ready(function () {
            $('.airport').select2();
        });

        console.log(this.state.selected);
        return (
            <div>
            <br /><label> From:</label>
                <select id="selected" onChange={this.handleChange}>
                    <option disabled selected value> -- select an option -- </option>
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
        this.setState({
            selected : event.target.value
        });
        
    },

    //Creates select object from Airport array
    render: function () {
        $(document).ready(function () {
            $('.airport').select2();
        });

        console.log(this.state.selected);
        return (
            <div><br /><label> To:</label>
                <select id="selected" onChange={this.handleChange} required>
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



/**
*Makes TableEntries object which displays flights
*
*/
var TableEntries = React.createClass({

    //Initializes variables to empty 
    getInitialState: function () {
        return {
            Flight: [],
            view: ''
        };
        this.handleChange = this.handleChange.bind(this)
    },

    //Pulls flights JSON from server and sets it to Flight array
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

    //When an sort is selected it changes variable 
    handleChange(event) {
        this.setState({
            view: event.target.value
        });

    },

    //Creates table from Flight array with headers and view selector
    render: function () {
        return (
            <div>
                <label>Sort by:</label>

                <select onChange={this.handleChange}>
                    <option value="0">Descending Price</option>
                    <option value="1">Ascending Price</option>
                    <option value="2">Departure Time</option>
                </select>

        
                <table>
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
                    } 
                </table>
            </div>
        );
    }
});



