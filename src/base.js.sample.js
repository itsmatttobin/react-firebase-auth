import firebase from 'firebase';

let config = {
	/* Firebase app config */
}

export const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database();
export const auth = firebaseApp.auth();

export const storageKey = 'user_access_key';

// Return true if there is a current user
export const isAuthenticated = () => {
	return !!auth.currentUser || !!localStorage.getItem(storageKey);
}