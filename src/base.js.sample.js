import firebase from 'firebase';

let config = {
	/* Firebase app config */
}

export const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database();
export const auth = firebaseApp.auth();

// Return true if there is a current user
export const isAuthenticated = () => {
	return !!auth.currentUser;
}