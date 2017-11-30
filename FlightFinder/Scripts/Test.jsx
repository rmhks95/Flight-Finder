

var TableHeader = React.createClass({
    render: function () {
        return (
                <div className="flightsList">
                    <br />
                    <br/> 
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
                    </table>
                </div>
        );
    }
});

var Search = React.createClass({
    render: function () {
        return (
            <div>
                <input placeholder="From" />
                <p/>
                <input placeholder="To" />
                <p/>
                <button>Submit</button>
            </div>
        );
    }
});



var TableEntries = React.createClass({
    render: function() { return (<div />); }
});






var Header = React.createClass({
    render: function () {
        return (
            <div className="commentBox">
                <h1>Flights</h1>
                <a href="/json"> JSON Display</a>
                <p/>
                <Search />
                <TableHeader />
                <TableEntries />
            </div>
        );
    }
});

ReactDOM.render(
    <Header />,
    document.getElementById('content')
); 