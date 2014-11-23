var React = require('react');
var ProgressBar = require('react-bootstrap/ProgressBar');

var Htop = React.createClass({
  displayName: 'Htop',
  getInitialState: function() {
    setInterval(function() {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if(xhr.status == 200) {
          var response = JSON.parse(xhr.response);
          this.setState({'cpu_load': response.cpu_load})
        }
      }.bind(this)
      xhr.open('GET', '/stats', false);
      xhr.send(null);
    }.bind(this)
    , 2000)

    return {'cpu_load': []};
  },
  render: function() {
    return (
      <div className="cpu">
        {this.state.cpu_load.map(function(percentage) {
          return (<ProgressBar now={percentage} label="%(percent)s%" />)
        })}
      </div>
    );
  }
});

React.render(
  <Htop/>,
  document.getElementById('application')
);

