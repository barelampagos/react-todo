import firebase from 'firebase';

try {
	var firebaseConfig = {
		apiKey: process.env.API_KEY,
		authDomain: process.env.AUTH_DOMAIN,
		databaseURL: process.env.DATABASE_URL,
		storageBucket: process.env.STORAGE_BUCKET
	};

	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
} catch (e) {}

// Get parent most reference
export var firebaseRef = firebase.database().ref();
export default firebase;
