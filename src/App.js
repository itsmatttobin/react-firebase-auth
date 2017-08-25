import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';
import NotFound from './NotFound';
import Login from './Login';
import { auth, storageKey, isAuthenticated } from './base';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null
    }
  }

  componentDidMount() {
    // Check if a user is already signed in
    // If so, add them to the state
    // Ref: http://bodiddlie.github.io/firebase-auth-with-react-router/
    auth.onAuthStateChanged(user => {
      if(user) {
        window.localStorage.setItem(storageKey, user.uid);

        this.setState({
          user: user
        });
      } else {
        window.localStorage.removeItem(storageKey);

        this.setState({
          user: null
        });
      }
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <MatchWhenAuthorized path="/dashboard" component={Dashboard} />
            <Route component={NotFound} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;

// For locking down a route for only authenticated users
// If a user is autheniticated then render the compoenent passed to the route
// If not then redirect them to the login component with a referrer
const MatchWhenAuthorized = ({component: Component, ...rest}) => (
  <Route {...rest} render={renderProps => (
    isAuthenticated() ? (
      <Component {...renderProps} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: {from: renderProps.location}
      }} />
    )
  )}/>
)


