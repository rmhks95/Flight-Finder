var TableEntries = React.createClass({
            getInitialState: function() {
                return {
                    Country: []
                };
            },  
            componentDidMount: function () {
                $.ajax({
                    url: this.props.url,
                    dataType: 'json',
                    success: function (data) {
                        this.setState({
                            Country: data
                        });
                    }.bind(this),
                    error: function (xhr, status, err) {
                        console.error(this.props.url, status, err.toString());
                    }.bind(this)
                });
            },
            render: function () {
                return (<table> {
                    this.state.Country.map(function (item, key) {
                        return (<tr key={
                            key
                        } > <td> {
                            item.CountryID
                        } </td> <td > & nbsp; </td> <td > {
                            item.CountryName
                        } </td> </tr>)
                    })
                } </table>);
            }
}); ReactDOM.render(< TableExample url="/Home/Flights" />, document.getElementById('container'));  
