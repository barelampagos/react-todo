import firebase from 'firebase';
import auth from 'auth';

try {
	// Your web app's Firebase configuration
	var firebaseConfig = {
		apiKey: auth.firebaseAuth,
		authDomain: 'br-todo-app.firebaseapp.com',
		databaseURL: 'https://br-todo-app.firebaseio.com',
		storageBucket: 'br-todo-app.appspot.com'
	};

	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
} catch (e) {}

// Get parent most reference
export var firebaseRef = firebase.database().ref();
export default firebase;
