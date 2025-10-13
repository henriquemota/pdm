import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
	apiKey: process.env.EXPO_PUBLIC_apiKey,
	authDomain: process.env.EXPO_PUBLIC_authDomain,
	projectId: process.env.EXPO_PUBLIC_projectId,
	storageBucket: process.env.EXPO_PUBLIC_storageBucket,
	messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,
	appId: process.env.EXPO_PUBLIC_appId,
	databaseURL: process.env.EXPO_PUBLIC_databaseURL,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export { db }
