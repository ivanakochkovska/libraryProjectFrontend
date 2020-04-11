import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import Header from "./components/Header/header";
class App extends Component {
    /*
    componentDidMount() {
        this.setState({isLoading:true});
        fetch('http://localhost:9090/findall')
            .then(response=>response.json())
            .then(data=>this.setState({books:data,isLoading:false}));
    }
/*
    render() {
    const routing = (
        <Router>
          <main role="main" className="mt-3">

            <div className="container">
              <Route path={"/adminPanel"} exact render={() =>
                  <Header></Header>
              }></Route>
            </div>
          </main>

        </Router>
    )
    return (
        <div className="App">
          {routing}
        </div>
    );
  }
  */

}


export default App;
