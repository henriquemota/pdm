import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/_firebase'

const Auth = () => {
	const _handleCriar = () => {
		createUserWithEmailAndPassword(auth, 'mota.henrique@gmail.com', 'senha123456')
			.then((userCredential) => {
				// Signed up
				const user = userCredential.user
				console.log(user)
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
			})
	}

	const _handleAutenticar = () => {
		signInWithEmailAndPassword(auth, 'mota.henrique@gmail.com', 'senha123456')
			.then((userCredential) => {
				// Signed up
				const user = userCredential.user
				console.log(user)
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
				console.log(error.message)
			})
	}

	return (
		<View>
			<Button mode='contained' onPress={_handleCriar}>
				Criar
			</Button>
			<Button mode='contained' onPress={_handleAutenticar}>
				Logar
			</Button>
		</View>
	)
}

export default Auth
