import React, { Component } from 'react';
import firebase from 'firebase';
import { auth } from './base';
import { Redirect } from 'react-router-dom';

class Login extends Component {
	constructor() {
		super();

		this.authenticate = this.authenticate.bind(this);
		this.signOut = this.signOut.bind(this);

		this.state = {
			user: null,
			redirectToReferrer: false
		}
	}

	authenticate() {
		// Set up Facebook login
		let provider = new firebase.auth.FacebookAuthProvider();

		// Using a popup window
		provider.setCustomParameters({
			'display': 'popup'
		});

		// If a user is autheniticated, add them to the state and set a redirect flag
		auth.signInWithPopup(provider).then(result => {
			console.log(result);
			this.setState({
				user: result.user,
				redirectToReferrer: true
			});
		}).catch(error => {
			console.log(error);
		});
	}

	signOut() {
		auth.signOut().then(() => {
			console.log('signed out');
			this.setState({
				user: null,
				redirectToReferrer: false
			});
		}).catch(error => {
			console.log(error);
		});
	}

	render() {
		// Get referrer if it was set when redirecting
		const {from} = this.props.location.state || '/';
    const {redirectToReferrer} = this.state;

		return (
			<div>
				{ /* If the redirect flag is set (a user is authenticated) then redirect them to the dashboard */ }
				{redirectToReferrer && 
					<Redirect to={from || '/dashboard'} />
				}
				<div className="login">
					<h1>This is the login page</h1>
					<button onClick={() => this.authenticate()}>Login with Facebook</button>
					<button onClick={() => this.signOut()}>Sign Out</button>
				</div>
			</div>
		)
	}
}

export default Login;