import firebase from 'firebase';

let config = {
	apiKey: "AIzaSyAI1snu27_AfNaas8_Pu-YDNqinFwv15vo",
	authDomain: "authentication-test-d29ea.firebaseapp.com",
	databaseURL: "https://authentication-test-d29ea.firebaseio.com",
	projectId: "authentication-test-d29ea",
	storageBucket: "authentication-test-d29ea.appspot.com",
	messagingSenderId: "1054751550049"
}

export const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database();
export const auth = firebaseApp.auth();

// Return true if there is a current user
export const isAuthenticated = () => {
	return !!auth.currentUser;
}