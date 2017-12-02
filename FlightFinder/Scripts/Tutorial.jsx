var CommentBox = React.createClass({  
    render: function() {  
        return (  
          <div className="commentBox">  
                vroom vroom
            </div>
      );  
    }  
});  
ReactDOM.render(  
    <CommentBox />,  
  document.getElementById('content')  
); 

$.getJSON("Home/Flights", function (json) {
    var tr;
    for (var i = 0; i < json.length; i++) {
        tr = $('<tr>')
        tr.append("<td>" + json[i].From + "</td>")
        tr.append("<td>" + json[i].To + "</td>")
        tr.append("<td>" + json[i].FlightNumber + "</td>")
        tr.append("<td>" + json[i].Departs + "</td>")
        tr.append("<td>" + json[i].Arrives + "</td>")
        tr.append("<td>" + json[i].MainCabinPrice + "</td>")
        tr.append("<td>" + json[i].FirstClassPrice + "</td>")
            < SortBox handlesort= { this.handleSort } />
    }
});
return (
    <table />
);