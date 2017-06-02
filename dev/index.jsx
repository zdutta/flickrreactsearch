import React from "react";
import ReactDOM from "react-dom";

/*
export default class HelloWorld extends React.Component{
  render() {
    return (
      <p>Hello, {this.props.greetTarget}!</p>
    );
  }
};
 
ReactDOM.render(
  <div>
    <HelloWorld greetTarget="Batman"/>
    <HelloWorld greetTarget="Iron Man"/>
    <HelloWorld greetTarget="Nicolas Cage"/>
    <HelloWorld greetTarget="Mega Man"/>
    <HelloWorld greetTarget="Bono"/>
    <HelloWorld greetTarget="Catwoman"/>
  </div>,
  document.querySelector("#container")
);
*/

var Input = React.createClass({
  getInitialState: function() {
    return {
        value: ""
    };
  },
  onChange: function(e) {
      this.setState({ value: e.target.value });
  },
  onKeyDown: function(e) {
    
    if (e.keyCode == 13) {
        this.props.localHandleChange(this.state.value);
        
    }
  },
  localHandleSubmit: function(e) {
    e.preventDefault();
    this.props.localHandleChange(this.state.value);
    this.setState({ value: '' }); 
  },  
  render: function() {
    return (
        <div>
            <input
                type="text"
                value={this.state.value}
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
            />
            <button onClick={this.localHandleSubmit}>{"Search"}</button>
        </div>
    );
  }
});


var Flickr = React.createClass({
  getInitialState: function() {
    return {
        pictures: []
    };
  },
    componentDidMount: function() {
      console.dir(this.props.data);
          var pictures = [];        
      if (this.props.data.photos.photo.length > 0) {
        var component = this;
        this.props.data.photos.photo.forEach(function(element) {
            pictures.push(<div>{element.id}</div>);
        });
        
      }
              this.setState({
            pictures: pictures
        });        
    },  
  render: function() {
    var pictures = [];
    if (this.props.data.photos.photo.length > 0) {
        this.props.data.photos.photo.forEach(function(element) {
            pictures.push(<div key={element.id}><a href={"https://www.flickr.com/photos/" + element.owner + "/" + element.id} target={"_blank"}><img src={"https://farm" + element.farm + ".staticflickr.com/" + element.server + "/" + element.id + "_" + element.secret + "_m.jpg"} /></a></div>);
        });              
    }      
    return (
      <div>{pictures}</div>
    );
  }    
});

var App = React.createClass({
  getInitialState: function() {
    return {
        value: '',
        data: {
            photos: {
                photo: {}
            }
        }
    };
  },
 
  localHandleChange: function(value) {
    this.setState({ value: value});
    var component = this;
    console.dir(value);
    var searchUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=15bf40cebb5ca3292282553bc3e6b185&tags=" + value + "&format=json&nojsoncallback=1";
    $.get(searchUrl, function(data) {
        this.setState({
            data: data
        });
      }.bind(this));
  },  
  render: function() {
    return (
      <div>
        <Input localHandleChange={this.localHandleChange} />
    
        <Flickr data={this.state.data} />
        
      </div>
    )
  }  
});



ReactDOM.render(<App />, document.getElementById("app"));